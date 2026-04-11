'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle nav background after scrolling past ~60px
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Startups', href: '#grid' },
    { name: 'Mission', href: '#about' }, // Can adjust anchor ids later
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 h-[64px] transition-all duration-300 ${
          scrolled
            ? 'bg-[#F7F3EE]/95 backdrop-blur-[12px] border-b border-[#E8E0D5] shadow-[0_1px_12px_rgba(0,0,0,0.06)]'
            : 'bg-transparent border-b-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-baseline font-display">
              <span className="font-bold text-[24px] text-[#1A1A1A]">52startup</span>
              <span className="font-bold text-[24px] text-[#E8610A]">.</span>
            </Link>
            <span className="hidden md:block text-[12px] text-[#6B6B6B] font-normal border-l border-gray-300 pl-3">
              Make India Great Again
            </span>
          </div>

          {/* Center Section - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[14px] font-medium text-[#1A1A1A] hover:text-[#E8610A] transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#grid"
              className="text-[14px] font-medium text-[#1A1A1A] hover:text-[#E8610A] transition-colors duration-200 flex items-center gap-1.5"
            >
              Week 2 <span className="w-2 h-2 rounded-full bg-india-green animate-pulse" />
            </Link>
          </nav>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="#grid"
              className="bg-[#E8610A] hover:bg-[#C4520A] text-white font-semibold text-[14px] px-[20px] py-[8px] rounded-full transition-colors duration-200 flex items-center gap-1"
            >
              View All Startups <span className="text-lg leading-none">&rarr;</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-[#1A1A1A] p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-[64px] left-0 w-full bg-[#F7F3EE] border-b border-[#E8E0D5] shadow-lg flex flex-col px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-left py-3 text-[16px] font-medium text-[#1A1A1A]"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#grid"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left py-3 text-[16px] font-medium text-[#1A1A1A] flex items-center gap-2"
            >
              Week 2 <span className="w-2 h-2 rounded-full bg-india-green animate-pulse" />
            </Link>
            
            <div className="pt-4 mt-2 border-t border-[#E8E0D5] flex flex-col gap-3">
              <Link
                href="#grid"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-[#E8610A] text-white text-center font-semibold text-[15px] py-3 rounded-xl"
              >
                View All Startups &rarr;
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
