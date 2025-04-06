// export default function CalendarStatCard({ card = {} }) {
//   const { title, data, colors } = card;

//   return (
//     <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm text-gray-500">{title}</p>
//           <h3 className="text-xl font-bold">{data}</h3>
//         </div>
//         <div className={`p-2 rounded-full ${colors}`}>
//           <card.icon className="h-5 w-5" />
//         </div>
//       </div>
//     </div>
//   );
// }

export default function CalendarStatCard({ card = {} }) {
  const { title, data, colors, icon: Icon, secondaryData } = card;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-xl font-bold mt-1">{data}</h3>
          {secondaryData && <p className="text-xs text-gray-400 mt-1">{secondaryData}</p>}
        </div>
        {/* <div className={`p-2 rounded-lg ${colors.split(" ")[0]} bg-opacity-50`}> */}
        <div className={`p-2 rounded-lg ${colors}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
