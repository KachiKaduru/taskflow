export default function SponsorsSection() {
  const teams = ["Google", "Microsoft", "Spotify", "Airbnb", "Netflix"];

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-6">
        <p className="text-center text-gray-500 mb-8">Trusted by teams at</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
          {teams.map((company) => (
            <div
              key={company}
              className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
