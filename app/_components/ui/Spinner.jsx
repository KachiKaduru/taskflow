const Spinner = ({ size = "md", color = "gray" }) => {
  // Size classes
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
    xl: "h-16 w-16 border-4",
  };

  // Color classes
  const colorClasses = {
    blue: "border-blue-500 border-t-blue-200",
    gray: "border-gray-500 border-t-gray-200",
    green: "border-green-500 border-t-green-200",
    red: "border-red-500 border-t-red-200",
    yellow: "border-yellow-500 border-t-yellow-200",
    indigo: "border-indigo-500 border-t-indigo-200",
    purple: "border-purple-500 border-t-purple-200",
    pink: "border-pink-500 border-t-pink-200",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
        style={{ animation: "spin 1s linear infinite" }}
      ></div>
    </div>
  );
};

export default Spinner;
