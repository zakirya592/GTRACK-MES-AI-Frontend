// A browser only keeps about 6 connections open to one host on HTTP/1.1.
// Each live MJPEG preview holds one of those connections forever, so a grid
// of 59 cameras can paint only the first handful. These helpers open a few
// connections, copy one JPEG frame, then close the connection so every camera
// gets a turn.

const MIN_FRAME_BYTES = 2048;
const MAX_BUFFER_BYTES = 5 * 1024 * 1024;

function concatChunks(chunks, total) {
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  return bytes;
}

export function extractJpeg(bytes) {
  let offset = 0;

  while (offset < bytes.length - 1) {
    let start = -1;
    for (let i = offset; i < bytes.length - 1; i += 1) {
      if (bytes[i] === 0xff && bytes[i + 1] === 0xd8) {
        start = i;
        break;
      }
    }
    if (start < 0) return null;

    for (let i = start + 2; i < bytes.length - 1; i += 1) {
      if (bytes[i] === 0xff && bytes[i + 1] === 0xd9) {
        const frame = bytes.subarray(start, i + 2);
        if (frame.byteLength >= MIN_FRAME_BYTES) return frame;
        offset = i + 2;
        start = -1;
        break;
      }
    }

    if (start >= 0) return null;
  }

  return null;
}

export async function grabJpegFrame(url, signal) {
  const response = await fetch(url, { signal, cache: "no-store" });
  if (!response.ok || !response.body) {
    throw new Error(`Preview failed (${response.status})`);
  }

  const reader = response.body.getReader();
  const chunks = [];
  let received = 0;

  try {
    while (received < MAX_BUFFER_BYTES) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      received += value.length;
      const frame = extractJpeg(concatChunks(chunks, received));
      if (frame) {
        return new Blob([frame], { type: "image/jpeg" });
      }
    }
  } finally {
    await reader.cancel().catch(() => {});
  }

  throw new Error("Preview frame not found");
}

function withTimeout(parentSignal, ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  const abort = () => controller.abort();
  if (parentSignal.aborted) controller.abort();
  else parentSignal.addEventListener("abort", abort, { once: true });

  return {
    signal: controller.signal,
    clear() {
      clearTimeout(timer);
      parentSignal.removeEventListener("abort", abort);
    },
  };
}

const delay = (ms, signal) =>
  new Promise((resolve) => {
    const timer = setTimeout(resolve, ms);
    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        resolve();
      },
      { once: true },
    );
  });

// Keep a few slots free for the health and alerts requests.
const CONCURRENCY = 3;

export function startSnapshotPool(cameras, onFrame, parentSignal) {
  if (cameras.length === 0) return;

  const concurrency = Math.min(CONCURRENCY, cameras.length);
  const seen = new Set();

  const run = async (start) => {
    let index = start;
    while (!parentSignal.aborted) {
      const camera = cameras[index % cameras.length];
      index += concurrency;
      const firstVisit = !seen.has(camera.id);
      seen.add(camera.id);

      const timed = withTimeout(parentSignal, 8000);
      try {
        const blob = await grabJpegFrame(camera.url, timed.signal);
        if (!parentSignal.aborted) onFrame(camera.id, blob);
      } catch {
        if (parentSignal.aborted) return;
      } finally {
        timed.clear();
      }

      if (parentSignal.aborted) return;
      await delay(firstVisit ? 40 : 350, parentSignal);
    }
  };

  for (let worker = 0; worker < concurrency; worker += 1) {
    run(worker);
  }
}
