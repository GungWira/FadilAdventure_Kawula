import HeroBanner from "@/components/hero/hero-banner";
import LearnCarousel from "@/components/hero/learn-carousel";
import StreamCarousel from "@/components/hero/stream-carousel";

export default async function Home() {
  return (
    <>
      <HeroBanner />
      <LearnCarousel />
      <StreamCarousel />
    </>
  );
}
