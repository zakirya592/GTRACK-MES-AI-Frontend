import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Camera, 
  AlertTriangle, 
  ArrowLeft,
  Play,
  Pause,
  Settings,
  Download,
  Share2
} from "lucide-react";
import { baseUrl } from "../../utils/config";

function CameraDetail() {
  const { cameraId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCameraLive, setIsCameraLive] = React.useState(true);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  
  // Get ipAddress from navigation state
  const ipAddress = location.state?.ipAddress || "192.168.1.100";

  // Handler functions for control buttons
  const handleDownload = () => {
    const imgSrc = `${baseUrl}/live-detection-camera-${cameraId}`;
    const link = document.createElement('a');
    link.href = imgSrc;
    link.download = `camera-${cameraId}-snapshot.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: `Camera ${cameraId} - Live View`,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Camera link copied to clipboard!');
    }
  };

  const handleSettings = () => {
    alert('Settings panel would open here');
  };

  // Mock camera data - in real app, this would come from an API
  const cameraData = {
    id: cameraId,
    name: `Camera ${cameraId}`,
    location: "Production Area 1",
    status: isCameraLive ? "online" : "offline",
    lastUpdate: "30 sec ago",
    alerts: 2,
    resolution: "1920x1080",
    fps: 30,
    uptime: "99.8%",
    ipAddress: ipAddress,
    macAddress: "00:1B:44:11:3A:B7",
    firmware: "v2.4.1",
    lastMaintenance: "2025-05-15"
  };

  const recentAlerts = [
    {
      id: 1,
      type: "No Helmet Detected",
      time: "10:30:18",
      severity: "high",
      confidence: "96%"
    },
    {
      id: 2,
      type: "Unauthorized Access",
      time: "10:25:42",
      severity: "high",
      confidence: "89%"
    },
    {
      id: 3,
      type: "Safety Violation",
      time: "10:20:15",
      severity: "medium",
      confidence: "92%"
    }
  ];

  return (
    <div className="flex min-h-screen bg-linear-to-br from-slate-50 to-slate-100 w-full">
      <div className="flex-1 p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <button
            onClick={() => navigate("/live-view")}
            className="flex items-center text-slate-600 hover:text-slate-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Live View
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                {cameraData.name}
              </h1>
              <p className="text-slate-500">{cameraData.location}</p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-4 py-2 rounded-full text-sm font-bold ${
                  cameraData.status === "online"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {cameraData.status.toUpperCase()}
              </span>
              {cameraData.alerts > 0 && (
                <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  {cameraData.alerts} Active Alerts
                </span>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Camera Feed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Camera Feed */}
              <div className="relative h-96 bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                {!isCameraLive ? (
                  <div className="flex flex-col items-center justify-center text-slate-500">
                    <Camera className="w-24 h-24 mb-4" />
                    <p className="text-xl font-medium">Camera Offline</p>
                    <p className="text-sm">The camera is currently not running</p>
                  </div>
                ) : (
                  <>
                    <img
                      src={`${baseUrl}/live-detection-camera-${cameraId}`}
                      alt="Live AI camera detection stream"
                      className="max-h-[520px] w-full object-contain"
                      onLoad={() => setImageLoaded(true)}
                      onError={() => setIsCameraLive(false)}
                    />
                    {!imageLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-500"></div>
                      </div>
                    )}
                    {imageLoaded && (
                      <>
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          LIVE
                        </div>
                        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm">
                          {cameraData.resolution} @ {cameraData.fps}fps
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Controls */}
              <div className="p-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  {/* <div className="flex gap-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Play
                    </button>
                    <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                      <Pause className="w-4 h-4" />
                      Pause
                    </button>
                  </div> */}
                  <div className="flex gap-2">
                    <button onClick={handleDownload} className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-lg transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                    <button onClick={handleShare} className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-lg transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button onClick={handleSettings} className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-lg transition-colors">
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-slate-800 mb-4">
                Recent Alerts
              </h2>
              <div className="space-y-3">
                {recentAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-lg ${
                          alert.severity === "high"
                            ? "bg-red-100"
                            : "bg-yellow-100"
                        }`}
                      >
                        <AlertTriangle
                          className={`w-5 h-5 ${
                            alert.severity === "high"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">
                          {alert.type}
                        </p>
                        <p className="text-sm text-slate-500">{alert.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-700">
                        Confidence: {alert.confidence}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          alert.severity === "high"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {alert.severity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Camera Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Camera Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4">
                Camera Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Status</span>
                  <span
                    className={`font-medium ${
                      cameraData.status === "online"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {cameraData.status}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Location</span>
                  <span className="font-medium text-slate-800">
                    {cameraData.location}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Resolution</span>
                  <span className="font-medium text-slate-800">
                    {cameraData.resolution}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Frame Rate</span>
                  <span className="font-medium text-slate-800">
                    {cameraData.fps} fps
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Uptime</span>
                  <span className="font-medium text-slate-800">
                    {cameraData.uptime}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">IP Address</span>
                  <span className="font-medium text-slate-800">
                    {cameraData.ipAddress}
                  </span>
                </div>
                {/* <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">MAC Address</span>
                  <span className="font-medium text-slate-800">{cameraData.macAddress}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Firmware</span>
                  <span className="font-medium text-slate-800">{cameraData.firmware}</span>
                </div> */}
                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-500">Last Maintenance</span>
                  <span className="font-medium text-slate-800">
                    {cameraData.lastMaintenance}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
              <h2 className="text-xl font-bold mb-4">Today's Statistics</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-blue-100">Total Alerts</span>
                  <span className="text-2xl font-bold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-100">High Priority</span>
                  <span className="text-2xl font-bold">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-100">Resolved</span>
                  <span className="text-2xl font-bold">7</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default CameraDetail;
