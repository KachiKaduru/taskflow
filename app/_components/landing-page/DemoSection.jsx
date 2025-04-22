import { CalendarIcon, ChartBarIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export default function DemoSection() {
  return (
    <section id="demo" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">See TaskFlow in Action</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A quick glimpse of how TaskFlow transforms your scheduling experience
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-3xl opacity-20 blur-lg"></div>
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-1 bg-gradient-to-r from-blue-400 to-indigo-500">
              <div className="bg-white p-6 rounded-t-2xl">
                {/* Mock app interface */}
                <div className="flex h-[500px]">
                  {/* Sidebar mock */}
                  <div className="w-64 bg-gray-50 rounded-l-lg p-4 border-r">
                    <div className="space-y-4">
                      <div className="h-8 bg-blue-100 rounded animate-pulse"></div>
                      <div className="h-8 bg-blue-600 rounded text-white flex items-center px-3">
                        <CalendarIcon className="h-5 w-5 mr-2" />
                        Calendar
                      </div>
                      <div className="h-8 bg-blue-100 rounded flex items-center px-3">
                        <ChartBarIcon className="h-5 w-5 mr-2 text-blue-600" />
                        Analytics
                      </div>
                    </div>
                  </div>
                  {/* Main content mock */}
                  <div className="flex-1 p-6">
                    <div className="grid gap-4">
                      <div className="h-10 bg-gray-100 rounded-lg flex items-center px-4">
                        <div className="h-6 w-6 bg-blue-600 rounded-full mr-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                      </div>
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="h-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 flex items-center px-4"
                        >
                          <div className="h-8 w-8 rounded-full bg-blue-100 mr-4 flex items-center justify-center">
                            <CheckCircleIcon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="h-4 bg-blue-100 rounded w-3/4 animate-pulse"></div>
                            <div className="h-3 bg-blue-50 rounded w-1/2 mt-2 animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                      <div className="mt-4 h-48 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                        <div className="text-center p-6">
                          <ChartBarIcon className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                          <p className="text-gray-500">
                            Your productivity metrics will appear here
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
