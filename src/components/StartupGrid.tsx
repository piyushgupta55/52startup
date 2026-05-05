'use client';

import { startups as initialStartups, Startup } from '@/data/startups';
import { StartupCard } from './StartupCard';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function StartupGrid() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("52startup_data");
    if (saved) {
      setStartups(JSON.parse(saved));
    } else {
      setStartups(initialStartups);
    }
  }, []);

  const visibleStartups = showAll ? startups : startups.slice(0, 8);

  return (
    <section id="grid" className="py-24 px-4 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-dark-gray mb-4">
              The 52 <span className="text-primary-orange">Ship-list</span>
            </h2>
            <p className="text-dark-gray/60 text-lg max-w-xl">
              Tracing the journey through 52 weeks of building, shipping, and learning. Each card represents a week of relentless execution.
            </p>
          </div>

          <div className="flex gap-4 text-sm font-bold uppercase tracking-widest text-dark-gray/40">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-orange" />
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gray-200 border border-gray-300" />
              <span>Upcoming</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleStartups.map((startup, index) => (
            <motion.div
              key={startup.week}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 4) * 0.1 }}
            >
              <StartupCard startup={startup} />
            </motion.div>
          ))}
        </div>

        {!showAll && startups.length > 8 && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-4 bg-primary-orange text-white font-display font-semibold rounded-xl hover:bg-saffron transition-all hover:shadow-[0_10px_40px_rgba(232,97,10,0.3)] hover:-translate-y-1"
            >
              Explore Startups 🚀
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
