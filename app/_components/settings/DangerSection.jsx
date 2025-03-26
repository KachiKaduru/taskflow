export default function DangerSection() {
  return (
    <div className="border bg-red-50 border-red-100 rounded-lg p-4 ">
      <h4 className="font-medium mb-3 text-red-800">Danger Zone</h4>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h5 className="text-sm font-medium text-red-700">Delete Account</h5>
          <p className="text-xs text-red-600">Permanently remove your account and all data</p>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
}
