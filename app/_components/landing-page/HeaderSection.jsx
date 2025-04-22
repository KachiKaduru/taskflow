import Link from "next/link";

export default function HeaderSection() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600 flex items-center gap-2">TaskFlow</div>
        <div className="flex items-center gap-4">
          <Link
            href="#features"
            className="hidden md:inline text-gray-600 hover:text-blue-600 transition-colors"
          >
            Features
          </Link>
          <Link
            href="#testimonials"
            className="hidden md:inline text-gray-600 hover:text-blue-600 transition-colors"
          >
            Testimonials
          </Link>
          <Link
            href="#pricing"
            className="hidden md:inline text-gray-600 hover:text-blue-600 transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md transition-all"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}
