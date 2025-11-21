import CardWrapper from "@/src/components/ui/dashboard/Cards";
import { HeroSection } from "@/src/app/dashboard/overview/hero-section";
export default function Dashboard() {
  return (
    <>
      <HeroSection />
      <section className="mt-10">
        <CardWrapper />
      </section>
    </>
  );
}
