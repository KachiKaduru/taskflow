import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function PricingSection() {
  const pricingArr = [
    {
      name: "Starter",
      price: "Free",
      period: "forever",
      features: [
        "Basic task management",
        "Google Calendar sync",
        "1 month analytics history",
        "Email support",
      ],
      cta: "Get Started",
    },
    {
      name: "Pro",
      price: "$9",
      period: "per month",
      popular: true,
      features: [
        "Everything in Starter",
        "Advanced analytics",
        "Unlimited history",
        "AI scheduling",
        "Priority support",
      ],
      cta: "Start Free Trial",
    },
    {
      name: "Team",
      price: "$29",
      period: "per month",
      features: [
        "Everything in Pro",
        "Up to 5 team members",
        "Shared calendars",
        "Admin controls",
        "Dedicated account manager",
      ],
      cta: "Contact Sales",
    },
  ];
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingArr.map((plan, i) => (
            <div
              key={i}
              className={`border rounded-xl p-8 relative ${
                plan.popular ? "border-blue-500 shadow-lg" : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-6 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period !== "forever" && <span className="text-gray-500">/{plan.period}</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-blue-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className={`block text-center py-3 px-6 rounded-full font-medium transition-all ${
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                    : "border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
