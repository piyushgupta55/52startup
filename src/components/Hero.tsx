'use client';

import { motion } from 'framer-motion';
import { Rocket, Lightbulb, Laptop, Star, IndianRupee, Globe } from 'lucide-react';

const FloatingIcon = ({ icon: Icon, delay, x, y, size = 24 }: { icon: any, delay: number, x: string, y: string, size?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0.4, 0.8, 0.4],
      scale: [1, 1.1, 1],
      y: [0, -20, 0],
      x: [0, 10, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }}
    style={{ position: 'absolute', left: x, top: y }}
    className="text-primary-orange/30 pointer-events-none"
  >
    <Icon size={size} />
  </motion.div>
);

export default function Hero() {
  const icons = [
    { icon: Rocket, x: '10%', y: '20%', delay: 0, size: 32 },
    { icon: Lightbulb, x: '85%', y: '15%', delay: 1, size: 28 },
    { icon: Laptop, x: '15%', y: '70%', delay: 2, size: 30 },
    { icon: Star, x: '80%', y: '75%', delay: 3, size: 24 },
    { icon: IndianRupee, x: '50%', y: '10%', delay: 4, size: 26 },
    { icon: Globe, x: '70%', y: '40%', delay: 5, size: 34 },
  ];

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-white px-4 pt-20">
      {/* Background Icons */}
      {icons.map((item, index) => (
        <FloatingIcon key={index} {...item} />
      ))}

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto w-full">

        {/* Ashoka Chakra Background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.18, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10"
        >
          <img
            src="/ashoka.svg"
            alt="Ashoka Chakra"
            className="w-[200px] md:w-[350px] mb-[100px] object-contain animate-[spin_60s_linear_infinite]"
            aria-hidden="true"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold uppercase tracking-tighter mb-6 leading-[0.9]"
            style={{ textShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
          >
            <span className="text-primary-orange">Make India</span> <br />
            <span className="text-india-green">Great Again</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-xl md:text-3xl text-dark-gray/80 font-medium mb-10 tracking-tight">
            52 Startups. 52 Weeks. One Mission.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            onClick={() => document.getElementById('grid')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative inline-flex items-center gap-3 bg-primary-orange text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:bg-saffron hover:scale-[1.03] hover:shadow-[0_15px_40px_rgba(232,97,10,0.25)] active:scale-95"
          >
            Explore Startups
            <Rocket className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:translate-x-1.5 group-hover:rotate-12" />
          </button>
        </motion.div>
      </div>

      {/* India Flag Gradient Stripe */}
      <div className="absolute bottom-0 left-0 w-full h-1 flex">
        <div className="w-1/3 h-full bg-[#FF9933]"></div>
        <div className="w-1/3 h-full bg-[#FFFFFF]"></div>
        <div className="w-1/3 h-full bg-[#138808]"></div>
      </div>
    </section>
  );
}
