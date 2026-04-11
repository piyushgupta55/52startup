'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="py-16 md:py-24 px-5 bg-white">
      <div className="max-w-4xl mx-auto md:text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-saffron font-bold uppercase tracking-[0.3em] text-xs md:text-sm">The Vision</span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-dark-gray mt-4 mb-6 md:mb-8">
            Why 52 Startups?
          </h2>
          <div className="w-16 md:w-24 h-1 bg-primary-orange md:mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-6 text-[15px] sm:text-lg md:text-xl text-dark-gray/80 leading-relaxed text-left md:text-center">
          <p>
            India is at the precipice of a global digital revolution. From the streets of Bengaluru to the hubs of Delhi and Mumbai, the spirit of building is everywhere. Yet, we often get bogged down by perfection and the fear of failure.
          </p>
          <p className="font-semibold text-dark-gray text-lg sm:text-xl md:text-2xl py-2 border-l-4 border-primary-orange pl-4 md:border-none md:pl-0">
            52Startup.com is a rebellion against that fear.
          </p>
          <p>
            By committing to building 52 startups in 52 weeks, I am choosing quantity as a path to quality, and speed as a driver of innovation. It's about shipping fast, building in public, and showing that with enough grit, anyone can build a legacy from Bharat.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 grid grid-cols-3 gap-3 md:gap-8"
        >
          <div className="p-4 md:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center hover:border-primary-orange/30 transition-colors">
            <h4 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-primary-orange mb-1 md:mb-2">52</h4>
            <p className="text-[10px] md:text-sm font-semibold text-dark-gray/60 uppercase tracking-widest break-words w-full">Projects</p>
          </div>
          <div className="p-4 md:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center hover:border-saffron/30 transition-colors">
            <h4 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-saffron mb-1 md:mb-2">365</h4>
            <p className="text-[10px] md:text-sm font-semibold text-dark-gray/60 uppercase tracking-widest break-words w-full">Days</p>
          </div>
          <div className="p-4 md:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center hover:border-india-green/30 transition-colors">
            <h4 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-india-green mb-1 md:mb-2">1</h4>
            <p className="text-[10px] md:text-sm font-semibold text-dark-gray/60 uppercase tracking-widest break-words w-full">Nation</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
