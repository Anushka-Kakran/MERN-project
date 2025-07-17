import Button from "./Button";
import { FaGlobe, FaSearch, FaCheckCircle, FaTools } from "react-icons/fa";

const LearnMore = () => {
  return (
    <section className="bg-white text-textDark px-6 py-20 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 text-primaryDark">
          Why Web Accessibility Matters
        </h1>
        <p className="text-lg text-textLight mb-16 text-center max-w-3xl mx-auto">
          Accessibility is not optional. It ensures digital inclusivity for people with disabilities. Our analyzer empowers you to meet modern compliance and user experience standards.
        </p>

        {/* 👨‍💼 Professional Description Sections */}
        <div className="grid md:grid-cols-3 gap-10 mb-20">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-primary">What is Accessibility?</h2>
            <p className="text-textLight">
              It ensures that websites, tools, and tech are designed so people with visual, auditory, motor, or cognitive challenges can use them effectively.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-primary">Why It’s Important</h2>
            <ul className="list-disc text-textLight ml-4 space-y-2">
              <li>1.3B people worldwide live with disabilities</li>
              <li>Legal risks for non-compliance (ADA, WCAG)</li>
              <li>Improves SEO, UX, and brand reputation</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-primary">How We Help</h2>
            <p className="text-textLight">
              Our automated scanner detects WCAG 2.1 issues like contrast, ARIA roles, alt text, and keyboard navigation problems. It provides instant suggestions.
            </p>
          </div>
        </div>

        {/* 🔷 Diagram Section */}
        <div className="bg-grayBg rounded-xl p-10 shadow-sm mb-20">
          <h2 className="text-2xl font-semibold mb-10 text-center text-primary">How the Analyzer Works</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <FaGlobe className="text-4xl text-primary mb-4" />
              <h4 className="font-semibold mb-1">1. Enter URL</h4>
              <p className="text-sm text-textLight">Start with your web page link.</p>
            </div>
            <div className="flex flex-col items-center">
              <FaSearch className="text-4xl text-accent mb-4" />
              <h4 className="font-semibold mb-1">2. Run Scan</h4>
              <p className="text-sm text-textLight">Our tool audits your page for violations.</p>
            </div>
            <div className="flex flex-col items-center">
              <FaCheckCircle className="text-4xl text-warning mb-4" />
              <h4 className="font-semibold mb-1">3. Get Insights</h4>
              <p className="text-sm text-textLight">You'll see detailed reports and impact levels.</p>
            </div>
            <div className="flex flex-col items-center">
              <FaTools className="text-4xl text-danger mb-4" />
              <h4 className="font-semibold mb-1">4. Fix & Improve</h4>
              <p className="text-sm text-textLight">We offer code suggestions and next steps.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a href="/analyze">
            <Button
              text="Try the Analyzer"
              className="bg-primary hover:bg-primaryDark text-white px-6 py-3 rounded-lg text-lg shadow-md"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default LearnMore;
