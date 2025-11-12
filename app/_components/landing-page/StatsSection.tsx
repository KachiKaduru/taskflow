export default function StatsSection() {
  const statsArr = [
    { number: "10K+", label: "Active Users" },
    { number: "98%", label: "Satisfaction" },
    { number: "3.5x", label: "Productivity Boost" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {statsArr.map((stat, index) => (
            <div key={index} className="p-6">
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
