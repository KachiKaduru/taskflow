import CheckedToggle from "../ui/CheckedToggle";

export default function AdvancedSettings() {
  return (
    <div className="border bg-white border-gray-100 rounded-lg p-4">
      <h4 className="font-medium mb-4">Advanced</h4>
      <div className="flex justify-between items-center">
        <div>
          <h5 className="text-sm font-medium">Dark Mode</h5>
          <p className="text-xs text-gray-500">Switch interface theme</p>
        </div>

        <CheckedToggle />

        {/* <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label> */}
      </div>
    </div>
  );
}
