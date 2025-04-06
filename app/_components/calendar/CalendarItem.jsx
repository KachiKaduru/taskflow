// "use client";

// import { useCalendar } from "@/app/_contexts/CalendarContext";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// export default function CalendarItem() {
//   const { view, date, setDate } = useCalendar();

//   return (
//     <div className="lg:col-span-1 bg-white rounded-xl shadow-sm p-4 border border-gray-100">
//       <Calendar
//         onChange={setDate}
//         value={date}
//         className="border-none w-full"
//         view={view === "month" ? "month" : "month"} // Always show month view for navigation
//         tileClassName={({ date: tileDate, view }) => {
//           let classes = "";
//           if (tileDate.toDateString() === new Date().toDateString()) {
//             classes += " bg-blue-50 text-blue-600 rounded-full";
//           }
//           if (view === "month" && tileDate.getMonth() !== date.getMonth()) {
//             classes += " text-gray-400";
//           }
//           return classes;
//         }}
//       />
//     </div>
//   );
// }

"use client";

import { useCalendar } from "@/app/_contexts/CalendarContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarItem() {
  const { view, date, setDate, setView } = useCalendar();

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    if (view === "month") {
      setDate(activeStartDate);
    }
  };

  return (
    <div className="lg:col-span-1 bg-white rounded-xl shadow-sm p-4 border border-gray-100">
      <Calendar
        onChange={setDate}
        value={date}
        className="border-none w-full"
        view={view === "month" ? "month" : "month"}
        onActiveStartDateChange={handleActiveStartDateChange}
        onClickDay={(value) => {
          setDate(value);
          setView("day");
        }}
        tileClassName={({ date: tileDate, view }) => {
          let classes = "hover:bg-gray-50 rounded-lg";
          if (tileDate.toDateString() === new Date().toDateString()) {
            classes += " bg-blue-50 text-blue-600 font-medium";
          }
          if (view === "month" && tileDate.getMonth() !== date.getMonth()) {
            classes += " text-gray-400";
          }
          return classes;
        }}
        // tileContent={({ date: tileDate, view }) =>
        //   view === "month" && (
        //     <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-1">
        //       {[1, 2, 3].map((dot) => (
        //         <div key={dot} className="h-1 w-1 rounded-full bg-blue-400 opacity-70" />
        //       ))}
        //     </div>
        //   )
        // }
      />
    </div>
  );
}
