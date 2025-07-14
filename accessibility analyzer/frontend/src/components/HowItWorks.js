import { FaLink, FaSearch, FaCheckCircle } from "react-icons/fa";

const HowItWork = ({ className = "" }) => {
  return (
    <div className={`relative bg-white p-10 rounded-xl shadow-lg max-w-6xl mx-auto mb-16 ${className}`}>
      <h2 className="text-3xl font-bold text-center mb-12 text-primaryDark">How It Works</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl mb-4 shadow-md">
            <FaLink />
          </div>
          <h3 className="text-lg font-semibold mb-2">Enter Website URL</h3>
          <p className="text-textLight text-sm">Paste the URL of the website you want to analyze for accessibility.</p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-warning text-white flex items-center justify-center text-2xl mb-4 shadow-md">
            <FaSearch />
          </div>
          <h3 className="text-lg font-semibold mb-2">Perform Scan</h3>
          <p className="text-textLight text-sm">The tool performs a WCAG 2.1 compliant scan and detects accessibility issues.</p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-2xl mb-4 shadow-md">
            <FaCheckCircle />
          </div>
          <h3 className="text-lg font-semibold mb-2">View Insights & Fix</h3>
          <p className="text-textLight text-sm">Review detailed reports with fix suggestions and improve your site.</p>
        </div>
      </div>

      {/* Arrow connector for large screens */}
      <div className="hidden md:block absolute top-[120px] left-[120px] w-[75%] h-[1px] bg-gray-200 z-0" />
      <div className="hidden md:block absolute top-[115px] left-[calc(33%+60px)] w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-gray-300" />
      <div className="hidden md:block absolute top-[115px] left-[calc(66%+60px)] w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-gray-300" />
    </div>
  );
};

export default HowItWork;
