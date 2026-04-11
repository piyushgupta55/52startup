'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Rocket } from 'lucide-react';
import { startups } from '@/data/startups';
import Image from 'next/image';

export default function CurrentWeekBanner() {
  const currentWeek = startups.find(s => s.status === 'in-progress') || startups[0];

  return (
    <section className="py-12 px-4 bg-warm-white border-y border-gray-200">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 border border-primary-orange/20 overflow-hidden relative shadow-sm"
        >
          {/* Pulse Glow Effect */}
          <div className="absolute inset-0 bg-primary-orange/5 animate-pulse" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
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
              
              <h2 className="text-4xl md:text-5xl font-display font-semibold text-dark-gray mb-4">
                {currentWeek.name}
              </h2>
              
              <p className="text-lg text-dark-gray/70 mb-8 max-w-md">
                {currentWeek.tagline}
              </p>
              
              <a 
                href={currentWeek.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-dark-gray text-white px-6 py-3 rounded-xl font-bold transition-all hover:bg-black hover:scale-105"
              >
                Visit Startup
                <ExternalLink size={18} />
              </a>
            </div>
            
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-200 shadow-2xl">
              {currentWeek.thumbnail ? (
                <Image 
                  src={currentWeek.thumbnail} 
                  alt={currentWeek.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <Rocket className="text-gray-300 w-20 h-20" />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
