import { CloudIcon } from "@heroicons/react/24/outline";

export default function IntegrationSection() {
  const teamsArr = ["Google Calendar", "Gmail", "Slack", "Zoom", "Microsoft Teams", "Trello"];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Works With Your Favorite Tools</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            TaskFlow integrates seamlessly with the services you already use
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
          {teamsArr.map((tool) => (
            <div
              key={tool}
              className="bg-white p-6 rounded-xl border border-gray-200 flex items-center justify-center hover:shadow-md transition-all"
            >
              <div className="text-center">
                <CloudIcon className="h-10 w-10 text-blue-400 mx-auto mb-2" />
                <div className="font-medium text-gray-700">{tool}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
