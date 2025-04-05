import { formatTimeString } from "@/app/_lib/helpers";
import { CalendarIcon } from "@heroicons/react/24/outline";

export default function EventCard({ event }) {
  return (
    <div className="p-4 hover:bg-gray-50">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
          <CalendarIcon className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <h3 className="font-medium">{event.title}</h3>
          <p className="text-sm text-gray-500">
            {formatTimeString(event.startTime)} - {event.location}
          </p>
        </div>
      </div>
    </div>
  );
}
