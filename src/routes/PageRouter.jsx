
import React from 'react'
import { Route, Routes } from "react-router-dom";
import Alert from '../Pages/Alerts/Alert';
import Dashboard from '../Pages/Dashboard/Dashboard';
import LiveView from '../Pages/LiveView/LiveView';
import CameraDetail from '../Pages/LiveView/CameraDetail';
import Events from '../Pages/Events/Events';

function PageRouter() {
  return (
      <div className="flex-1 overflow-y-auto">
        <Routes>
        {/* Public Route */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/Alert" element={<Alert />} />
        <Route path="/live-view" element={<LiveView />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/camera/:cameraId" element={<CameraDetail />} />
      </Routes>
      </div>
  );
}

export default PageRouter
