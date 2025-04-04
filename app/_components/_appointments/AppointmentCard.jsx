import { UserIcon } from "@heroicons/react/24/outline";

export default function AppointmentCard({ appointment }) {
  return (
    <div className="p-4 hover:bg-gray-50">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
          <UserIcon className="h-5 w-5 text-teal-600" />
        </div>
        <div>
          <h3 className="font-medium">With: {appointment.withPerson}</h3>
          <p className="text-sm text-gray-500">
            {appointment.title} • {new Date(appointment.date).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}
