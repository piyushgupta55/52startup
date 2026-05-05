"use client";

import React from "react";
import { Search, Bell, Menu, ExternalLink } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <button className="lg:hidden text-slate-500 hover:text-slate-900 transition-colors">
          <Menu size={20} />
        </button>
        <div className="relative max-w-md w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search for startups, metrics..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <a 
          href="/" 
          target="_blank" 
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
        >
          View Site <ExternalLink size={14} />
        </a>
        <button className="relative p-2 text-slate-500 hover:text-orange-500 hover:bg-orange-50/50 rounded-full transition-all">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-900">Admin Panel</p>
            <p className="text-[10px] text-slate-500">v1.0.2-stable</p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
            CP
          </div>
        </div>
      </div>
    </header>
  );
}
