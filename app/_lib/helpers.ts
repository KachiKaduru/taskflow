export const getCurrentTime = (): string => {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
};

export const getDate = (): string => new Date().toISOString().split("T")[0];

export const formatTimeString = (date: string | number | Date): string => {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export interface FilterTypeOption {
  value: "all" | "task" | "event" | "appointment";
  label: string;
}

export const filterTypes: FilterTypeOption[] = [
  { value: "all", label: "All Items" },
  { value: "task", label: "Tasks" },
  { value: "event", label: "Events" },
  { value: "appointment", label: "Appointments" },
];
