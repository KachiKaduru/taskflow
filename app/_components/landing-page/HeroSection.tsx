import { BoltIcon, CalendarIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="container mx-auto px-6 py-14 md:py-20 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
          <BoltIcon className="h-4 w-4 mr-1" /> Now with AI-powered scheduling
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
          Your Time, <span className="text-blue-600">Mastered</span>
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          TaskFlow seamlessly integrates with Google Calendar to give you complete control over your
          schedule, with intelligent insights to boost your productivity.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <CalendarIcon className="h-5 w-5" />
            Start For Free
          </Link>
          <Link
            href="#demo"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full text-lg transition-all flex items-center justify-center gap-2"
          >
            <DevicePhoneMobileIcon className="h-5 w-5" />
            See Live Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
