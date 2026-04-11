import { Twitter, Linkedin, Instagram, Youtube, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8 md:pt-24 md:pb-12 px-5 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-12">
          
          {/* Brand Section */}
          <div className="lg:w-1/3">
            <h2 className="text-3xl font-display font-bold text-dark-gray mb-3 md:mb-5 uppercase tracking-tighter">
              52<span className="text-primary-orange">Startup</span>.com
            </h2>
            <p className="text-dark-gray/60 text-[14px] md:text-[15px] mb-6 leading-relaxed max-w-sm">
              Building the future of India, one week at a time. Join the journey and get inspired to build your own legacy.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { Icon: Twitter, href: "https://x.com/piyush_code" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/piyushgupta55/" },
                { Icon: Instagram, href: "https://www.instagram.com/freelancewith.piyush/" },
                { Icon: Youtube, href: "#" }
              ].map(({ Icon, href }, i) => (
                <a 
                  key={i} 
                  href={href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-[#F7F3EE] text-dark-gray/70 rounded-full hover:bg-primary-orange hover:text-white transition-all transform hover:-translate-y-1"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-gray-100 lg:hidden" />

          {/* Links & Newsletter */}
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-10">
            
            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4 uppercase tracking-widest text-[11px] md:text-sm text-saffron">Quick Links</h4>
              <ul className="flex flex-wrap sm:flex-col gap-x-6 gap-y-3">
                {['Home', 'All Startups', 'About Mission', 'Newsletter'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[14px] md:text-[15px] text-dark-gray/70 hover:text-primary-orange font-medium transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="sm:pl-6 sm:border-l border-gray-100">
              <h4 className="font-bold mb-4 uppercase tracking-widest text-[11px] md:text-sm text-saffron">Stay Updated</h4>
              <p className="text-[14px] text-dark-gray/60 mb-5 leading-relaxed">
                Get the weekly ship log delivered to your inbox.
              </p>
              <form className="relative flex items-center max-w-md">
                <input 
                  type="email" 
                  placeholder="Indi-builder@email.com"
                  className="w-full bg-[#F7F3EE] border border-transparent rounded-full pl-5 pr-14 py-3 text-[14px] text-dark-gray placeholder-gray-400 focus:outline-none focus:bg-white focus:border-primary-orange/50 focus:ring-4 focus:ring-primary-orange/10 transition-all shadow-inner"
                />
                <button className="absolute right-1.5 p-2 bg-primary-orange text-white rounded-full hover:bg-[#C4520A] transition-colors shadow-md">
                  <Mail size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-6 md:pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-dark-gray/40 text-[12px] md:text-[13px] font-medium tracking-wide">
            © 2026 52STARTUP.COM. ALL RIGHTS RESERVED.
          </p>
          <p className="flex items-center justify-center gap-1.5 text-dark-gray/60 text-[13px] font-medium bg-[#F7F3EE] px-4 py-1.5 rounded-full">
            Built with <Heart size={12} className="text-primary-orange fill-primary-orange" /> in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
