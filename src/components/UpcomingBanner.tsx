'use client';

import { motion } from 'framer-motion';
import { Rocket, Calendar, Sparkles, ArrowRight } from 'lucide-react';
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

  const upcomingStartup = startups.find(s => s.status === 'upcoming');

  if (!upcomingStartup) return null;

  return (
    <section className="py-16 px-4 bg-white relative overflow-hidden border-b border-gray-100">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary-orange/[0.02] rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          
          {/* Visual Side: The "Week" indicator */}
          <div className="relative order-2 lg:order-1 flex-shrink-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <span className="text-[10rem] md:text-[14rem] font-display font-black leading-none text-gray-50 select-none tracking-tighter">
                {upcomingStartup.week < 10 ? `0${upcomingStartup.week}` : upcomingStartup.week}
              </span>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative group">
                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-[2rem] bg-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-center p-6 transition-all duration-500 group-hover:scale-105">
                    <Rocket className="w-full h-full text-primary-orange transform transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                  
                  {/* Floating Sparkles */}
                  <motion.div 
                    animate={{ y: [0, -5, 0], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-2 -right-2 bg-saffron text-white p-2.5 rounded-xl shadow-lg"
                  >
                    <Sparkles size={16} />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Content Side */}
          <div className="flex-1 text-center lg:text-left order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-orange/10 border border-primary-orange/20 text-primary-orange text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-orange opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary-orange"></span>
                </span>
                Next Mission
              </div>
              
              <h2 className="text-4xl md:text-6xl font-display font-bold text-dark-gray mb-4 tracking-tighter leading-tight">
                {upcomingStartup.name === "Coming Soon" ? (
                  <>Preparing for <span className="text-primary-orange">Launch</span></>
                ) : (
                  upcomingStartup.name
                )}
              </h2>
              
              <p className="text-lg md:text-xl text-dark-gray/50 mb-8 max-w-xl font-medium leading-snug">
                {upcomingStartup.tagline}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start mb-8">
                <div className="flex flex-col items-center lg:items-start gap-0.5">
                  <span className="text-[9px] font-black text-dark-gray/20 uppercase tracking-[0.3em]">Status</span>
                  <span className="text-base font-bold text-dark-gray flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-india-green" />
                    In Development
                  </span>
                </div>
                
                <div className="hidden sm:block w-px h-8 bg-gray-200" />

                <div className="flex flex-col items-center lg:items-start gap-0.5">
                  <span className="text-[9px] font-black text-dark-gray/20 uppercase tracking-[0.3em]">Launch Date</span>
                  <span className="text-base font-bold text-dark-gray flex items-center gap-2">
                    <Calendar size={16} className="text-primary-orange" />
                    {upcomingStartup.launchDate ? new Date(upcomingStartup.launchDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' }) : "To Be Announced"}
                  </span>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center gap-3 bg-dark-gray text-white px-8 py-4 rounded-xl font-bold text-base transition-all hover:bg-primary-orange hover:shadow-lg"
              >
                <span>Notify me</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
