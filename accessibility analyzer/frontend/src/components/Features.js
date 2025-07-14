const features = [
  {
    title: "Fast Scanning",
    icon: "⚡",
    description: "Our analyzer runs in seconds, giving you immediate feedback.",
    color: "bg-primary",
  },
  {
    title: "WCAG Compliance",
    icon: "📘",
    description: "Checks your site against WCAG 2.1 accessibility standards.",
    color: "bg-accent",
  },
  {
    title: "Detailed Reports",
    icon: "📊",
    description: "Get an organized list of all accessibility issues.",
    color: "bg-warning",
  },
  {
    title: "Fix Suggestions",
    icon: "🛠️",
    description: "Understand what to change and how to fix each issue.",
    color: "bg-danger",
  },
];

const Features = () => {
  return (
    <section className="bg-grayBg py-20 px-6 text-textDark font-sans">
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h2 className="text-4xl font-bold text-primaryDark mb-4">
          Powerful Features
        </h2>
        <p className="text-textLight text-lg max-w-2xl mx-auto">
          Unlock the full potential of your website with our fast,
          standards-compliant, and actionable analysis tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition duration-300 text-center"
          >
            <div
              className={`w-14 h-14 mx-auto flex items-center justify-center text-2xl text-white rounded-full mb-4 ${feature.color}`}
              aria-hidden="true"
            >
              {feature.icon}
            </div>

            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-textLight text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
