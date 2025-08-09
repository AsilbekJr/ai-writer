import Features from '@/components/homepage/features';
import Footer from '@/components/homepage/footer';
import Hero from '@/components/homepage/hero';
import Logos from '@/components/homepage/logos';
import Pricing from '@/components/homepage/pricing';
import Testimonials from '@/components/homepage/testimonials';

export default function Homepage() {
  return (
    <>
      <Hero />
      <Logos />
      <Features />
      <Testimonials />
      <Pricing />
      <Footer />
    </>
  );
}
