import HeroSection from '../components/Hero'; 
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import WhyAccessibility from '../components/WhyAccessibility';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';

const Home = () => {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <Features />
      <WhyAccessibility />
      <Testimonials />
      <CallToAction />
    </main>
  );
};

export default Home;
