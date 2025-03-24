import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">TaskFlow</div>
        <Link
          href="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md transition-all"
        >
          Get Started
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
          Organize Your Life, <br />
          <span className="text-blue-600">One Task at a Time</span>
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          The beautiful, intuitive way to manage your schedule. Sync with your calendar, track
          progress, and never miss a deadline again.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg shadow-lg transition-all"
          >
            Start For Free
          </Link>
          <Link
            href="#features"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full text-lg transition-all"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* App Preview */}
      <div className="container mx-auto px-6 mb-28">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
          <div className="p-1 bg-gradient-to-r from-blue-400 to-indigo-500">
            <div className="bg-white p-6 rounded-t-2xl">
              {/* Mock app interface */}
              <div className="flex h-96">
                {/* Sidebar mock */}
                <div className="w-64 bg-gray-50 rounded-l-lg p-4 border-r">
                  <div className="space-y-4">
                    <div className="h-8 bg-blue-100 rounded"></div>
                    <div className="h-8 bg-blue-600 rounded"></div>
                    <div className="h-8 bg-blue-100 rounded"></div>
                  </div>
                </div>
                {/* Main content mock */}
                <div className="flex-1 p-6">
                  <div className="grid gap-4">
                    <div className="h-10 bg-gray-100 rounded-lg animate-pulse"></div>
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="h-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">Powerful Features</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: "📅",
                title: "Smart Scheduling",
                desc: "Drag-and-drop tasks to reschedule in seconds",
              },
              {
                icon: "🔄",
                title: "Calendar Sync",
                desc: "Two-way sync with Google Calendar",
              },
              {
                icon: "📊",
                title: "Progress Tracking",
                desc: "Visual charts to track your productivity",
              },
            ].map((feature, i) => (
              <div key={i} className="text-center p-6 hover:shadow-lg rounded-xl transition-all">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-400 to-indigo-400 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Productivity?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who are getting more done with TaskFlow.
          </p>
          <Link
            href="/login"
            className="inline-block bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-full text-lg font-semibold shadow-lg transition-all"
          >
            Sign Up Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="text-2xl font-bold mb-4">TaskFlow</div>
          <p className="text-gray-400 mb-8">The modern way to manage your time</p>
          <div className="flex justify-center space-x-6 mb-8">
            {["Terms", "Privacy", "Contact"].map((item) => (
              <Link key={item} href="#" className="text-gray-400 hover:text-white">
                {item}
              </Link>
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} TaskFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
