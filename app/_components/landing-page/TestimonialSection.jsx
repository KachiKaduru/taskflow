export default function TestimonialSection() {
  const testimonials = [
    {
      quote:
        "TaskFlow has completely transformed how I organize my work week. The Google Calendar integration is flawless.",
      name: "Sarah Johnson",
      role: "Marketing Director",
      avatar: "SJ",
    },
    {
      quote:
        "I've tried dozens of productivity apps, but none have given me the insights and control that TaskFlow provides.",
      name: "Michael Chen",
      role: "Software Engineer",
      avatar: "MC",
    },
    {
      quote:
        "The analytics alone are worth the price. I've identified and fixed so many time-wasting habits thanks to TaskFlow.",
      name: "Emily Rodriguez",
      role: "Freelance Designer",
      avatar: "ER",
    },
  ];
  return (
    <section id="testimonials" className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="text-blue-500 text-3xl mb-4">"</div>
              <p className="text-gray-600 mb-6">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
