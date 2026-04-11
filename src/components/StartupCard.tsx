'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Lock } from 'lucide-react';
import { Startup } from '@/data/startups';
import Image from 'next/image';

export function StartupCard({ startup }: { startup: Startup }) {
  const isUpcoming = startup.status === 'upcoming';
  const isInProgress = startup.status === 'in-progress';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`
        group relative flex flex-col h-full rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-105 hover:shadow-xl
        ${isInProgress ? 'border-primary-orange ring-1 ring-primary-orange/50 shadow-[0_0_20px_rgba(232,97,10,0.2)]' : 'border-gray-200 hover:border-primary-orange/50'}
        ${isUpcoming ? 'bg-gray-50 grayscale opacity-70' : 'bg-white'}
      `}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {startup.thumbnail ? (
          <Image
            src={startup.thumbnail}
            alt={startup.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${isUpcoming ? 'bg-gray-200/40 animate-pulse' : 'bg-gray-200/50'}`}>
            {isUpcoming ? <Lock className="text-gray-400 w-12 h-12" /> : <div className="text-gray-300 font-display text-8xl font-bold">{startup.week}</div>}
          </div>
        )}

        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`
            text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider
            ${isInProgress ? 'bg-primary-orange text-white' : 'bg-white/90 text-dark-gray border border-gray-200'}
          `}>
            Week {startup.week}
          </span>
          {isInProgress && (
            <span className="bg-india-green text-white text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
              Live
            </span>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-display font-semibold text-dark-gray mb-2 group-hover:text-primary-orange transition-colors">
          {startup.name}
        </h3>
        <p className="text-sm text-dark-gray/60 mb-6 line-clamp-2">
          {startup.tagline}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs font-semibold text-dark-gray/40 uppercase tracking-widest">
            {startup.category}
          </span>

          {!isUpcoming && (
            <a
              href={startup.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-gray-100 hover:bg-primary-orange hover:text-white transition-all text-dark-gray/40"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      {isUpcoming && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm z-10">
          <span className="text-dark-gray font-display font-medium uppercase tracking-widest text-sm px-5 py-2.5 bg-gray-100 border border-gray-200 rounded-full shadow-sm animate-pulse">
            Week unlocking soon…
          </span>
        </div>
      )}
    </motion.div>
  );
}
