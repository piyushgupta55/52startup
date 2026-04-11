export default function AnnouncementBar() {
  const text = "Vande Mataram Vande Mataram, Sujalaam Suphalaam Malayaja Sheetalaam, Shasyashyaamalaam Mataram ✦ Shubhrajyotsna Pulakitayaamineem, Phullakusumita Drumadala Shobhineem, Suhasineem Sumadhura Bhaashineem, Sukhadaam Varadaam Mataram ✦ Vande Mataram ✦ 🚀 52 Startups. 52 Weeks ✦ Making India Proud, One Startup at a Time ✦ Built in India with ❤️ ✦ Vande Mataram ✦";
  return (
    <div className="bg-[#E8610A] h-[36px] overflow-hidden flex items-center">
      <div className="flex whitespace-nowrap animate-marquee w-max pause-on-hover text-white font-medium text-[13px]">
        {/* We duplicate the text multiple times to ensure the container is wide enough for a seamless loop */}
        <span className="pr-4">{text}</span>
        <span className="pr-4">{text}</span>
      </div>
    </div>
  );
}
