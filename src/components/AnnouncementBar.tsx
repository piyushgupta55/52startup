export default function AnnouncementBar() {
  const text = "Vande Mataram ✦ 52 Startups. 52 Weeks ✦ Built in India 🇮🇳 ✦";
  return (
    <div className="bg-[#E8610A] h-[36px] overflow-hidden flex items-center">
      <div className="flex whitespace-nowrap animate-marquee w-max pause-on-hover text-white font-medium text-[13px] tracking-wide">
        {/* Repeating text multiple times to ensure a seamless loop on all screen sizes */}
        {[...Array(12)].map((_, i) => (
          <span key={i} className="px-4">{text}</span>
        ))}
      </div>
    </div>
  );
}
