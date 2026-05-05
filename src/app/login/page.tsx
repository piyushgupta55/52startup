"use client";

import React, { useState } from "react";
import { Lock, User, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock auth for now
    if (password === "admin123") {
      document.cookie = "admin_session=true; path=/; max-age=3600";
      window.location.href = "/admin";
    } else {
      setError("Invalid administrative password");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-2xl text-white mb-4 shadow-lg shadow-orange-500/20">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Login</h1>
          <p className="text-slate-500 mt-2">Enter your password to manage 52startup</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 transition-all font-mono"
                />
              </div>
              {error && <p className="text-red-500 text-xs mt-1 font-medium ml-1">{error}</p>}
            </div>

            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 bg-slate-950 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-950/20 group"
            >
              <span>Authenticate</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-center gap-2 text-slate-400">
            <Lock size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Secure Access Only</span>
          </div>
        </div>
        
        <p className="text-center mt-8 text-slate-400 text-sm">
          Don't have access? <a href="/" className="text-orange-500 font-bold hover:underline">Return to Home</a>
        </p>
      </motion.div>
    </div>
  );
}
