import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="bg-primary py-16 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">
        Ready to make your website accessible?
      </h2>
      <p className="mb-6">
        Start analyzing your site now and improve user experience for everyone.
      </p>

      <Link to="/analyze">
        <button
          className="px-6 py-3 bg-white text-primary font-semibold rounded hover:bg-gray-300 transition-colors"
          aria-label="Start accessibility analysis now"
        >
          Start Now
        </button>
      </Link>
    </section>
  );
};

export default CallToAction;
