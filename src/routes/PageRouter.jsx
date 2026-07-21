
import React from 'react'
import { Route, Routes } from "react-router-dom";
import Alert from '../Pages/Alerts/Alert';
import AlertDetail from '../Pages/Alerts/AlertDetail';
import Dashboard from '../Pages/Dashboard/Dashboard';
import LiveView from '../Pages/LiveView/LiveView';
import CameraDetail from '../Pages/LiveView/CameraDetail';
import Events from '../Pages/Events/Events';
import Devices from '../Pages/Devices/Devices';
import Reports from '../Pages/Reports/Reports';
import Settings from '../Pages/Settings/Settings';
import Login from '../Pages/Login/Login';
import Email from '../Pages/Email/Email';
import WhatsApp from '../Pages/WhatsApp/WhatsApp';

function PageRouter() {
  return (
    <div className="flex-1 overflow-y-auto">
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Alert" element={<Alert />} />
        <Route path="/alert/:alertId" element={<AlertDetail />} />
        <Route path="/live-view" element={<LiveView />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/email" element={<Email />} />
        <Route path="/whatsapp" element={<WhatsApp />} />
        <Route path="/camera/:cameraId" element={<CameraDetail />} />
      </Routes>
    </div>
  );
}

export default PageRouter
