'use client';

import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { startups as initialStartups, Startup } from '@/data/startups';
import { useState, useEffect } from 'react';

export default function UpcomingBanner() {
  const [startups, setStartups] = useState<Startup[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("52startup_data");
    if (saved) {
      setStartups(JSON.parse(saved));
    } else {
      setStartups(initialStartups);
    }
  }, []);

  // Find the first startup with 'upcoming' status
  const upcomingStartup = startups.find(s => s.status === 'upcoming');

  if (!upcomingStartup) return null;

  return (
    <section className="pt-8 pb-16 px-4 bg-warm-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-dark-gray rounded-[2rem] overflow-hidden relative shadow-2xl group border border-white/5"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-orange/10 via-transparent to-india-green/10 opacity-30" />
          
          <div className="p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 relative group-hover:scale-110 transition-transform duration-500">
                <Calendar className="text-primary-orange w-10 h-10" />
                <div className="absolute -top-2 -right-2 bg-saffron p-1.5 rounded-lg shadow-lg animate-bounce">
                   <Sparkles size={14} className="text-white" />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <span className="bg-primary-orange/20 text-primary-orange text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-primary-orange/20">
                    Up Next
                  </span>
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">
                    Week {upcomingStartup.week}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                  {upcomingStartup.name}
                </h3>
                <p className="text-white/60 text-base max-w-md line-clamp-1">
                  {upcomingStartup.tagline}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
              <div className="hidden lg:block h-16 w-px bg-white/10" />
              <div className="text-center md:text-left">
                <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Unlocks On</div>
                <div className="text-white text-lg font-bold">
                  {upcomingStartup.launchDate ? new Date(upcomingStartup.launchDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : "To Be Announced"}
                </div>
              </div>
              <button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white p-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:translate-x-2">
                <span className="font-bold text-sm uppercase tracking-widest md:hidden">Details</span>
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
          
          {/* Animated Glow */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary-orange/20 blur-[100px] rounded-full" />
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-india-green/10 blur-[100px] rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
