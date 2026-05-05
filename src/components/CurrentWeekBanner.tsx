'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Rocket } from 'lucide-react';
import { startups as initialStartups, Startup } from '@/data/startups';
import { useState, useEffect } from 'react';

export default function CurrentWeekBanner() {
  const [startups, setStartups] = useState<Startup[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("52startup_data");
    if (saved) {
      setStartups(JSON.parse(saved));
    } else {
      setStartups(initialStartups);
    }
  }, []);

  const currentWeek = startups.find(s => s.status === 'in-progress') 
    || [...startups].reverse().find(s => s.status === 'completed') 
    || initialStartups[0];

  return (
    <section className="pt-16 pb-8 px-4 bg-warm-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border border-primary-orange/20 overflow-hidden relative shadow-sm hover:shadow-xl hover:border-primary-orange/40 transition-all duration-300 group"
        >
          <a 
            href={currentWeek.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-8 relative z-10"
          >
            {/* Pulse Glow Effect */}
            <div className="absolute inset-0 bg-primary-orange/5 animate-pulse -z-10" />
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-primary-orange text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    Week {currentWeek.week}
                  </span>
                  <span className="flex items-center gap-1.5 text-india-green text-xs font-semibold uppercase tracking-wider">
                    <span className="w-2 h-2 bg-india-green rounded-full animate-ping" />
                    Live Now
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-display font-semibold text-dark-gray mb-4 group-hover:text-primary-orange transition-colors">
                  {currentWeek.name}
                </h2>
                
                <p className="text-lg text-dark-gray/70 mb-8 max-w-md">
                  {currentWeek.tagline}
                </p>
                
                <div 
                  className="inline-flex items-center gap-2 bg-dark-gray text-white px-6 py-3 rounded-xl font-bold transition-all group-hover:bg-primary-orange group-hover:scale-105"
                >
                  Visit Startup
                  <ExternalLink size={18} />
                </div>
              </div>
              
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-200 shadow-2xl group-hover:scale-[1.02] transition-transform duration-500">
                {currentWeek.thumbnail ? (
                  <img 
                    src={currentWeek.thumbnail} 
                    alt={currentWeek.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <Rocket className="text-gray-300 w-20 h-20" />
                  </div>
                )}
              </div>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
