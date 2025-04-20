import Spinner from "./Spinner";

export default function SubmitButton({ color = "blue", isLoading = false, buttonFor = "Task" }) {
  const colorClasses = {
    blue: "bg-blue-600",
    teal: "bg-teal-600",
    purple: "bg-purple-600",
  };

  return (
    <button
      type="submit"
      className={`w-full ${colorClasses[color]} text-white py-3 px-4 rounded-lg mt-4 flex gap-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
      disabled={isLoading}
    >
      <span>
        {!isLoading ? "Add" : "Creating"} {buttonFor}
      </span>
      {isLoading && <Spinner size="sm" color={color} />}
    </button>
  );
}
