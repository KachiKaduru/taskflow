export default function PageHeader({ title = "", children }) {
  return (
    <section className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>

      {children}
    </section>
  );
}
