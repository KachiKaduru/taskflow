import {
  ArrowsRightLeftIcon,
  CalendarIcon,
  ChartBarIcon,
  CheckCircleIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export default function FeaturesSection() {
  const featuresArr = [
    {
      icon: <CalendarIcon className="h-10 w-10 text-blue-600" />,
      title: "Smart Scheduling",
      desc: "AI-powered suggestions for optimal task placement based on your habits and energy levels.",
      features: ["Auto-scheduling", "Time blocking", "Priority-based ordering"],
    },
    {
      icon: <ArrowsRightLeftIcon className="h-10 w-10 text-blue-600" />,
      title: "Google Calendar Sync",
      desc: "Two-way sync with Google Calendar keeps all your events in perfect harmony.",
      features: ["Real-time updates", "Conflict detection", "Bi-directional editing"],
    },
    {
      icon: <ChartBarIcon className="h-10 w-10 text-blue-600" />,
      title: "Progress Analytics",
      desc: "Visual dashboards show your productivity trends and completion rates.",
      features: ["Weekly reports", "Goal tracking", "Performance insights"],
    },
    {
      icon: <UsersIcon className="h-10 w-10 text-blue-600" />,
      title: "Team Collaboration",
      desc: "Share calendars and tasks with your team for better coordination.",
      features: ["Shared projects", "Delegation", "Real-time updates"],
    },
    {
      icon: <DevicePhoneMobileIcon className="h-10 w-10 text-blue-600" />,
      title: "Mobile Friendly",
      desc: "Full-featured mobile app keeps you productive on the go.",
      features: ["iOS & Android", "Offline access", "Mobile notifications"],
    },
    {
      icon: <ShieldCheckIcon className="h-10 w-10 text-blue-600" />,
      title: "Security First",
      desc: "Enterprise-grade security protects your sensitive schedule data.",
      features: ["End-to-end encryption", "2FA", "Regular audits"],
    },
  ];

  return (
    <section id="features" className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to take control of your schedule and productivity
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresArr.map((feature, i) => (
            <div
              key={i}
              className="border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-all group hover:border-blue-100"
            >
              <div className="p-3 bg-blue-50 rounded-full inline-flex group-hover:bg-blue-100 transition-colors mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.desc}</p>
              <ul className="space-y-2">
                {feature.features.map((item, j) => (
                  <li key={j} className="flex items-center text-gray-600">
                    <CheckCircleIcon className="h-5 w-5 text-blue-400 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
