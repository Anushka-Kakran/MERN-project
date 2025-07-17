import analyticsImg from '../assests/analytics.jpg';
import { Link } from 'react-router-dom';
import Button from './Button';

const Hero = () => {
  return (
    <header className="relative overflow-hidden bg-grayBg py-20 px-6">
      {/* Decorative Background Blob */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-primary opacity-10 rounded-full blur-3xl -z-10" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl -z-10" aria-hidden="true" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center z-10 relative">
        {/* Text Section */}
        <div className="text-textDark">
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Enhance Your <span className="text-primary">Web Accessibility</span>
          </h1>
          <p className="text-lg text-textLight mb-6 max-w-xl">
            Run quick scans on any URL and get instant, actionable insights into accessibility issues—designed for inclusivity and legal compliance.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/analyze"><Button text="Get Started" className="px-6 py-3" /></Link>

            <Link to="/overview">
              <button
                className="bg-white border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition"
              >
                Learn More
              </button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center md:justify-end">
          <img
            src={analyticsImg}
            alt="Visual representation of the accessibility dashboard"
            className="rounded-xl shadow-lg w-full max-w-md"
          />
        </div>
      </div>
    </header>
  );
};

export default Hero;
