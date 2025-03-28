export default function FormInput({ type = "text", name = "" }) {
  return (
    <input
      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      required
      name={name}
      type={type}
      minLength={type === "password" ? 6 : 2}
    />
  );
}
