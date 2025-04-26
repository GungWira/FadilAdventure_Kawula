import Hero from "@/components/hero";
import HeroBanner from "@/components/hero/hero-banner";
import LearnCarousel from "@/components/hero/learn-carousel";

import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default async function Home() {
  return (
    <>
      <Hero />
      <HeroBanner/>
      <LearnCarousel />
      
    </>
  );
}
