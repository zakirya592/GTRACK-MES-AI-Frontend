import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, MapPin, Clock, AlertTriangle, ShieldCheck, Play, Pause } from "lucide-react";

function LiveView() {
  const navigate = useNavigate();
  const [selectedCamera, setSelectedCamera] = useState(null);

  const cameras = [
    {
      id: 1,
      name: "Camera 1",
      location: "Production Area 1",
      status: "online",
      lastUpdate: "2 min ago",
      alerts: 0
    },
    {
      id: 2,
      name: "Camera 2",
      location: "Production Area 2",
      status: "online",
      lastUpdate: "1 min ago",
      alerts: 1
    },
    {
      id: 3,
      name: "Camera 3",
      location: "Warehouse",
      status: "offline",
      lastUpdate: "15 min ago",
      alerts: 0
    },
    {
      id: 4,
      name: "Camera 4",
      location: "Loading Dock",
      status: "online",
      lastUpdate: "30 sec ago",
      alerts: 0
    },
    {
      id: 5,
      name: "Camera 5",
      location: "Main Entrance",
      status: "online",
      lastUpdate: "1 min ago",
      alerts: 2
    },
    {
      id: 6,
      name: "Camera 6",
      location: "Parking Lot",
      status: "online",
      lastUpdate: "45 sec ago",
      alerts: 0
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
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Live View</h1>
          <p className="text-slate-500">Real-time camera monitoring across all locations</p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Total Cameras</p>
                <p className="text-2xl font-bold text-slate-800">{cameras.length}</p>
              </div>
              <Camera className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Online</p>
                <p className="text-2xl font-bold text-green-600">{cameras.filter(c => c.status === 'online').length}</p>
              </div>
              <ShieldCheck className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Offline</p>
                <p className="text-2xl font-bold text-red-600">{cameras.filter(c => c.status === 'offline').length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Active Alerts</p>
                <p className="text-2xl font-bold text-orange-600">{cameras.reduce((sum, c) => sum + c.alerts, 0)}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </motion.div>

        {/* Camera Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cameras.map((camera, index) => (
            <motion.div
              key={camera.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Camera Feed Placeholder */}
              <div className={`relative h-48 ${camera.status === 'offline' ? 'bg-slate-200' : 'bg-linear-to-br from-slate-100 to-slate-200'} flex items-center justify-center`}>
                {camera.status === 'online' ? (
                  <>
                    <Camera className="w-16 h-16 text-slate-400" />
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      LIVE
                    </div>
                  </>
                ) : (
                  <>
                    <Camera className="w-16 h-16 text-slate-300" />
                    <div className="absolute top-3 left-3 bg-slate-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      OFFLINE
                    </div>
                  </>
                )}
                {camera.alerts > 0 && (
                  <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {camera.alerts}
                  </div>
                )}
              </div>

              {/* Camera Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-slate-800">{camera.name}</h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    camera.status === 'online' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {camera.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-slate-600">
                    <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                    {camera.location}
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Clock className="w-4 h-4 mr-2 text-slate-400" />
                    Last update: {camera.lastUpdate}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => navigate(`/camera/${camera.id}`)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Play className="w-4 h-4" />
                    View
                  </button>
                  {/* {camera.status === 'online' && (
                    <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm">
                      <Pause className="w-4 h-4" />
                      Pause
                    </button>
                  )} */}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default LiveView;
