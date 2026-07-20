import React from "react";
import { AlertTriangle, User, Clock, MapPin, Camera, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

function Alert() {
  const recentAlerts = [
    {
      time: "10:30:18",
      camera: "IP Camera 2",
      event: "No Helmet Detected",
      status: "New",
      statusColor: "red"
    },
    {
      time: "10:28:42",
      camera: "IP Camera 1",
      event: "Helmet Detected",
      status: "Cleared",
      statusColor: "green"
    },
    {
      time: "10:25:15",
      camera: "IP Camera 3",
      event: "Unauthorized Access",
      status: "New",
      statusColor: "red"
    },
    {
      time: "10:20:30",
      camera: "IP Camera 1",
      event: "Safety Violation",
      status: "Resolved",
      statusColor: "yellow"
    }
  ];

  return (
    <div className="flex min-h-screen bg-linear-to-br from-slate-50 to-slate-100 w-full">
      <div className="flex-1 p-8">

        {/* Critical Alert Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-linear-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-t-2xl flex items-center shadow-lg">
            <div className="bg-white/20 p-2 rounded-lg mr-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-lg">CRITICAL SAFETY ALERT</span>
              <p className="text-red-100 text-sm">No Helmet Detected - Immediate Action Required</p>
            </div>
          </div>

          <div className="bg-white rounded-b-2xl shadow-xl p-6 flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-50 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <Camera className="w-5 h-5 text-slate-400 mr-2" />
                    <p className="text-slate-500 text-sm font-medium">Camera</p>
                  </div>
                  <p className="font-bold text-slate-800 text-lg">IP Camera 2</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <MapPin className="w-5 h-5 text-slate-400 mr-2" />
                    <p className="text-slate-500 text-sm font-medium">Location</p>
                  </div>
                  <p className="font-bold text-slate-800 text-lg">Production Area 1</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 text-slate-400 mr-2" />
                    <p className="text-slate-500 text-sm font-medium">Time</p>
                  </div>
                  <p className="font-bold text-slate-800 text-lg">2025-05-21 10:30:18</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="w-5 h-5 text-slate-400 mr-2" />
                    <p className="text-slate-500 text-sm font-medium">Event</p>
                  </div>
                  <p className="font-bold text-slate-800 text-lg">No Helmet Detected</p>
                </div>
              </div>
              <div className="bg-linear-to-r from-slate-50 to-slate-100 p-4 rounded-xl">
                <p className="text-slate-500 text-sm font-medium mb-1">AI Confidence Score</p>
                <div className="flex items-center gap-3">
                  <p className="font-bold text-3xl text-slate-800">96%</p>
                  <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-linear-to-r from-green-400 to-green-500 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-80">
              <div className="w-full h-80 bg-linear-to-br from-slate-100 to-slate-200 rounded-2xl border-4 border-red-400 flex items-center justify-center shadow-inner overflow-hidden">
                <div className="text-center">
                  <User className="w-20 h-20 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-400 text-sm font-medium">Detection Frame</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Alerts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Recent Alerts</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View All →</button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Camera
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentAlerts.map((alert, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-medium">
                      {alert.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                      {alert.camera}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                      {alert.event}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        alert.statusColor === 'red' 
                          ? 'bg-red-100 text-red-700' 
                          : alert.statusColor === 'green'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {alert.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Alert;
