import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Clock, Camera, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Spinner, Button, Card } from "@nextui-org/react";
import newRequest from "../../utils/userRequest";
import { AiOutlineEye } from "react-icons/ai";

function Alert() {
  const navigate = useNavigate();

  const getAlerts = async () => {
    const res = await newRequest.get("/detection-alerts");
    return res.data.data;
  };

const { data: RecentAlerts = [], isLoading, isError } = useQuery({
    queryKey: ['alerts'],
    queryFn: getAlerts
  });

  const totalAlerts = RecentAlerts.length;

  return (
    <div className="flex min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 w-full">
      <div className="flex-1 p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent mb-2">
                Alert Management
              </h1>
              <p className="text-slate-500 text-lg">Monitor and manage safety alerts in real-time</p>
            </div>
         
          </div>
        </motion.div>

       

        {/* Recent Alerts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6 shadow-xl bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Recent Alerts</h2>
              <div className="bg-blue-100 px-4 py-2 rounded-full">
                <span className="text-blue-700 font-bold">Total: {totalAlerts}</span>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-linear-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200">
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                      #
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Camera
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Event
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-center px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center gap-4">
                          <Spinner size="lg" color="default" className="text-slate-900" />
                          <p className="text-slate-500 text-lg">Loading...</p>
                        </div>
                      </td>
                    </tr>
                  ) : RecentAlerts.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center gap-4">
                          <AlertTriangle className="w-16 h-16 text-slate-300" />
                          <p className="text-slate-500 text-lg">No alerts found</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    RecentAlerts.map((item, index) => (
                      <tr 
                        key={item.id} 
                        className="border-b border-slate-100 hover:bg-linear-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group"
                      >
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-blue-600 text-white text-sm font-bold shadow-md">
                            {index + 1}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-slate-700 font-medium">
                              {new Date(item.time).toLocaleString()}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="bg-blue-100 p-2 rounded-lg">
                              <Camera className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="text-sm text-slate-700 font-semibold">
                              {item.camera}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                            <span className="text-sm text-slate-700">
                              {item.event}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${
                              item.status === "New"
                                ? "bg-linear-to-r from-red-100 to-red-200 text-red-700"
                                : item.status === "Resolved"
                                  ? "bg-linear-to-r from-green-100 to-emerald-200 text-green-700"
                                  : "bg-linear-to-r from-amber-100 to-yellow-200 text-amber-700"
                            }`}
                          >
                            {item.status === "New" && <XCircle className="w-3 h-3" />}
                            {item.status === "Resolved" && <CheckCircle className="w-3 h-3" />}
                            {item.status === "In Progress" && <Clock className="w-3 h-3" />}
                            {item.status}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Button
                            isIconOnly
                            size="sm"
                            className="bg-linear-to-r  transition-all duration-200 hover:scale-110"
                            onPress={() => navigate(`/alert/${item.id}`, { state: { alertData: item } })}
                          >
                            <AiOutlineEye className="size-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default Alert;
