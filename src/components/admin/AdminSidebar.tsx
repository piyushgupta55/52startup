"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Rocket, 
  ChevronRight, 
  LogOut
} from "lucide-react";
import { motion } from "framer-motion";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { name: "Manage Startups", icon: Rocket, href: "/admin/startups" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleSignOut = () => {
    // Clear auth cookie and redirect
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = "/admin/login";
  };

  return (
    <div className="w-64 h-screen bg-slate-950 text-white flex flex-col border-r border-slate-800">
      <div className="p-6 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-lg group-hover:rotate-12 transition-transform">
            52
          </div>
          <span className="font-bold text-xl tracking-tight">Admin<span className="text-orange-500">Hub</span></span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between p-3 rounded-xl transition-all group ${
                isActive 
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" 
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} className={isActive ? "text-white" : "group-hover:text-orange-500 transition-colors"} />
                <span className="font-medium text-sm">{item.name}</span>
              </div>
              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <ChevronRight size={16} />
                </motion.div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={handleSignOut}
          className="flex items-center gap-3 p-3 w-full text-slate-400 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all group"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm">Sign Out</span>
        </button>
        <div className="mt-4 p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-red-500 flex items-center justify-center font-bold text-white">
              AD
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Admin</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Active Session</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
