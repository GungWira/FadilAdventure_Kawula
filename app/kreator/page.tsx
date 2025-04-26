import LearnCarousel from "@/components/hero/learn-carousel";
import StreamCarousel from "@/components/hero/stream-carousel";
import KreatorBanner from "@/components/kreator/kreatorBanner";
import LatestContent from "@/components/kreator/latest-content";

export default async function KreatorPage() {
  return (
    <>
      <KreatorBanner />
      <LatestContent />
    </>
  );
}
