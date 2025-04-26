import Hero from "@/components/hero";
import HeroBanner from "@/components/hero/hero-banner";
import LearnCarousel from "@/components/hero/learn-carousel";

export default async function Home() {
  return (
    <>
      <Hero />
      <HeroBanner />
      <LearnCarousel />
    </>
  );
}
