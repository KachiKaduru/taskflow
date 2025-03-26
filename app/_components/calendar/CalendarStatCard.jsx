export default function CalendarStatCard({ card = {} }) {
  const { title, data, colors } = card;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-xl font-bold">{data}</h3>
        </div>
        <div className={`p-2 rounded-full ${colors}`}>
          <card.icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
