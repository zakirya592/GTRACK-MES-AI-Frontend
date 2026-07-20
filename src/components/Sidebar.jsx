import { 
  LayoutDashboard, 
  Eye, 
  Calendar, 
  AlertTriangle, 
  Monitor, 
  FileText, 
  Settings 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/",
    },
    {
      icon: Eye,
      label: "Live View",
      path: "/live-view",
    },
    {
      icon: Calendar,
      label: "Events",
      path: "/Events",
    },
    {
      icon: AlertTriangle,
      label: "Alerts",
      path: "/Alert",
      // notification: "2"
    },
    {
      icon: Monitor,
      label: "Devices",
      path: "/devices",
    },
    {
      icon: FileText,
      label: "Reports",
      path: "/reports",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
    },
  ];

  return (
    <div className=" h-screen bg-linear-to-b from-slate-900 to-slate-800 flex flex-col shadow-2xl overflow-hidden">
      <div className="p-6 border-b border-slate-700 shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500 p-2 rounded-lg">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-white text-xl font-bold">GTRACK-MES</h1>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                      : "text-slate-400 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon
                      className={`w-5 h-5 mr-3 ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"}`}
                    />
                  </motion.div>
                  <span className="flex-1 font-medium">{item.label}</span>
                  {item.notification && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold"
                    >
                      {item.notification}
                    </motion.span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700 shrink-0">
        <div className="bg-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <div>
              <p className="text-white font-medium text-sm">Admin User</p>
              <p className="text-slate-400 text-xs">System Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
