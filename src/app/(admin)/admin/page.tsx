"use client";

import React, { useState, useEffect } from "react";
import { 
  Rocket, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  ArrowUpRight 
} from "lucide-react";
import { motion } from "framer-motion";
import { startups as initialStartups, Startup } from "@/data/startups";
import Link from "next/link";

export default function AdminDashboard() {
  const [startups, setStartups] = useState<Startup[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("52startup_data");
    if (saved) {
      setStartups(JSON.parse(saved));
    } else {
      setStartups(initialStartups);
    }
  }, []);

  const completedCount = startups.filter(s => s.status === "completed").length;
  const progressPercentage = startups.length > 0 ? (completedCount / 52) * 100 : 0;

  const stats = [
    { 
      label: "Total Startups", 
      value: startups.length.toString(), 
      icon: Rocket, 
      color: "bg-blue-500",
    },
    { 
      label: "Completed", 
      value: completedCount.toString(), 
      icon: CheckCircle, 
      color: "bg-emerald-500",
    },
    { 
      label: "In Progress", 
      value: startups.filter(s => s.status === "in-progress").length.toString(), 
      icon: Clock, 
      color: "bg-orange-500",
    },
    { 
      label: "Mission Goal", 
      value: "52", 
      icon: TrendingUp, 
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 text-sm mt-1">Real-time status of your 52-week mission.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group"
          >
            <div className="flex justify-between items-start">
              <div className={`${stat.color} p-3 rounded-xl text-white group-hover:scale-110 transition-transform`}>
                <stat.icon size={20} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{stat.label}</h3>
              <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Card */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-bold text-slate-900">Weekly Progress</h2>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider">Mission 2026</span>
            </div>
          </div>
          
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-100">
                  {Math.round(progressPercentage)}% Completion
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2.5 mb-4 text-xs flex rounded-full bg-slate-100">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"
              ></motion.div>
            </div>
          </div>

          <div className="grid grid-cols-7 sm:grid-cols-13 gap-1.5 mt-8">
            {Array.from({ length: 52 }).map((_, i) => {
              const startup = startups.find(s => s.week === i + 1);
              const status = startup?.status || "upcoming";
              return (
                <div 
                  key={i} 
                  className={`h-3 rounded-sm transition-all duration-500 ${
                    status === 'completed' ? 'bg-emerald-500' : 
                    status === 'in-progress' ? 'bg-orange-500 animate-pulse' : 
                    'bg-slate-100'
                  }`}
                  title={`Week ${i + 1}: ${status}`}
                />
              );
            })}
          </div>
        </div>

        {/* Quick Link */}
        <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Live Status</h2>
            <p className="text-slate-400 text-sm">Managing {startups.length} startup entries. All changes reflect instantly on the public site.</p>
          </div>
          
          <div className="mt-8">
            <Link 
              href="/admin/startups"
              className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
            >
              <span>Manage Roadmap</span>
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
