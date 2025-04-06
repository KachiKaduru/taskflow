export const getCurrentTime = () => {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
};

export const getDate = () => new Date().toISOString().split("T")[0];

export const formatTimeString = (date) => {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const months = [
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

export const filterTypes = [
  { value: "all", label: "All Items" },
  { value: "task", label: "Tasks" },
  { value: "event", label: "Events" },
  { value: "appointment", label: "Appointments" },
];
