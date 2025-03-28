export default function FormInput({ type = "text", name = "" }) {
  return (
    <input
      className="w-full py-1 px-2 sm:p-2 border-b sm:rounded-sm sm:focus:ring-2 focus:ring-blue-500"
      required
      name={name}
      type={type}
      minLength={type === "password" ? 6 : 2}
    />
  );
}
