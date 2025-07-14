const testimonials = [
  {
    name: "Amit Sharma",
    text: "This tool helped me catch accessibility issues I didn’t know existed. Super helpful!"
  },
  {
    name: "Neha Verma",
    text: "The scanning was fast and the suggestions were very easy to follow."
  }
];

const Testimonials = () => {
  return (
    <section
      className="bg-gray-50 py-16 px-6 text-textDark"
      aria-labelledby="testimonials-heading"
    >
      <h2
        id="testimonials-heading"
        className="text-3xl font-bold text-center mb-12"
      >
        What Our Users Say
      </h2>

      <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <figure
            key={i}
            className="bg-white p-6 rounded-lg shadow"
            aria-label={`Testimonial from ${t.name}`}
          >
            <blockquote className="text-textLight italic">“{t.text}”</blockquote>
            <figcaption className="mt-4 font-semibold text-primary">
              — {t.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
