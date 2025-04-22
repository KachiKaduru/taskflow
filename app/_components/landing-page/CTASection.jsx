import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Productivity?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of professionals who trust TaskFlow to manage their time effectively.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/signup"
            className="inline-block bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-full text-lg font-semibold shadow-lg transition-all"
          >
            Get Started - It's Free
          </Link>
          <Link
            href="#demo"
            className="inline-block border-2 border-white text-white hover:bg-white/10 px-10 py-4 rounded-full text-lg font-semibold transition-all"
          >
            Watch Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
