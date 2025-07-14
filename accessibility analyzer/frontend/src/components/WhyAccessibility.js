import { FaUniversalAccess, FaSearch, FaCheckCircle } from "react-icons/fa";

const WhyAccessibility = () => {
  return (
    <section className="bg-grayBg py-16 px-6 text-textDark font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-primary">
            Why Accessibility Matters
          </h2>
          <p className="text-lg text-textLight max-w-2xl mx-auto">
            1 in 5 people worldwide have a disability. Making your website
            accessible ensures inclusivity, improves SEO, and prevents legal
            issues. Our tool helps you identify and fix barriers so everyone can
            access your content.
          </p>
        </div>

        {/* Dashboard-like Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center mt-12">
          {/* Error Type Distribution (Simulated Bar Chart) */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-primaryDark">
              Error Distribution by Type
            </h3>
            <div className="space-y-2">
              {[
                ["Missing Alt Text", "w-4/5"],
                ["Low Contrast", "w-3/4"],
                ["Keyboard Navigation", "w-2/4"],
                ["Form Labels", "w-1/3"],
                ["Heading Structure", "w-1/4"],
              ].map(([label, width]) => (
                <div key={label}>
                  <p className="text-sm text-textLight">{label}</p>
                  <div
                    className="bg-primary h-3 rounded-full mt-1"
                    style={{ width: `${width}` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          {/* Error Severity Breakdown (Simulated Donut Chart) */}
          {/* Error Severity Breakdown (Simulated Donut Chart) */}
          <div
            className="bg-white shadow-md rounded-lg p-6"
            role="img"
            aria-label="Donut chart showing error severity: 50% Critical, 30% Serious, 20% Minor."
          >
            <h3 className="text-xl font-semibold mb-4 text-primaryDark">
              Error Severity Breakdown
            </h3>

            <div className="flex justify-center items-center relative h-40 w-40 mx-auto">
              <div
                className="absolute h-36 w-36 rounded-full border-[14px] border-danger z-30"
                aria-hidden="true"
              />
              <div
                className="absolute h-36 w-36 rounded-full border-[14px] border-r-accent border-transparent z-20 rotate-[130deg]"
                aria-hidden="true"
              />
              <div
                className="absolute h-36 w-36 rounded-full border-[14px] border-r-warning border-transparent z-10 rotate-[240deg]"
                aria-hidden="true"
              />
              <div
                className="absolute h-16 w-16 bg-white rounded-full z-40"
                aria-hidden="true"
              ></div>
            </div>

            <ul className="mt-4 flex justify-center gap-6 text-sm text-textLight">
              <li>
                <span className="inline-block w-3 h-3 bg-danger rounded-full mr-1"></span>
                Critical
              </li>
              <li>
                <span className="inline-block w-3 h-3 bg-warning rounded-full mr-1"></span>
                Serious
              </li>
              <li>
                <span className="inline-block w-3 h-3 bg-accent rounded-full mr-1"></span>
                Minor
              </li>
            </ul>
          </div>
        </div>

        {/* Features at bottom (optional) */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 text-center">
          {[
            ["Inclusive Design", FaUniversalAccess],
            ["Automated Audits", FaSearch],
            ["Compliance Focused", FaCheckCircle],
          ].map(([title, Icon]) => (
            <div
              key={title}
              className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-all"
            >
              <Icon className="text-primary text-3xl mx-auto mb-3" />
              <h4 className="font-semibold text-lg text-textDark">{title}</h4>
              <p className="text-sm text-textLight mt-2">
                {title === "Inclusive Design" &&
                  "Design with empathy to serve all users."}
                {title === "Automated Audits" &&
                  "Scan your site in seconds with axe-core."}
                {title === "Compliance Focused" &&
                  "Stay aligned with WCAG and ADA standards."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAccessibility;
