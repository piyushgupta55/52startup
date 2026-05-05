import Hero from "@/components/Hero";
import CurrentWeekBanner from "@/components/CurrentWeekBanner";
import StartupGrid from "@/components/StartupGrid";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CurrentWeekBanner />
      <StartupGrid />
      <About />
      <Footer />
    </main>
  );
}
