import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
} from "chart.js";
import { useCalendar } from "@/app/_contexts/CalendarContext";
import type { ScheduleItem } from "@/app/_types";
import { format, eachDayOfInterval, subDays, isSameDay } from "date-fns";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale
);

export default function ActivityDashboard() {
  const { scheduleItems } = useCalendar();

  const resolvePrimaryDateString = (item: ScheduleItem): string | null => {
    if (item.type === "task") {
      return item.dueDate ?? item.date ?? null;
    }
    if (item.type === "event") {
      return item.startTime ?? null;
    }
    return item.date ?? null;
  };

  const resolveComparableDate = (item: ScheduleItem): Date | null => {
    const primary = resolvePrimaryDateString(item);
    if (primary) {
      const parsed = new Date(primary);
      if (!Number.isNaN(parsed.getTime())) {
        return parsed;
      }
    }

    if (item.type === "event" && item.endTime) {
      const parsed = new Date(item.endTime);
      if (!Number.isNaN(parsed.getTime())) {
        return parsed;
      }
    }

    if (item.type === "task" && item.createdAt) {
      const parsed = new Date(item.createdAt);
      if (!Number.isNaN(parsed.getTime())) {
        return parsed;
      }
    }

    return null;
  };

  // Get data for last 7 days
  const last7Days = eachDayOfInterval({
    start: subDays(new Date(), 6),
    end: new Date(),
  });

  // Process real data
  const processData = () => {
    const dailyData = last7Days.map((day) => {
      const dayString = format(day, "yyyy-MM-dd");

      return {
        date: dayString,
        label: format(day, "EEE"),
        tasksCompleted: scheduleItems.filter(
          (item) =>
            item.type === "task" &&
            item.isCompleted &&
            (() => {
              const dateString = resolvePrimaryDateString(item);
              return dateString ? isSameDay(new Date(dateString), day) : false;
            })()
        ).length,
        tasksCreated: scheduleItems.filter(
          (item) =>
            item.type === "task" &&
            (() => {
              const createdSource = item.createdAt ?? item.dueDate ?? null;
              return createdSource ? isSameDay(new Date(createdSource), day) : false;
            })()
        ).length,
        events: scheduleItems.filter(
          (item) =>
            item.type === "event" &&
            (() => {
              const start = resolvePrimaryDateString(item);
              return start ? isSameDay(new Date(start), day) : false;
            })()
        ).length,
        appointments: scheduleItems.filter(
          (item) =>
            item.type === "appointment" &&
            (() => {
              const source = resolvePrimaryDateString(item);
              return source ? isSameDay(new Date(source), day) : false;
            })()
        ).length,
        totalDuration: scheduleItems
          .filter((item) => {
            const dateValue = resolveComparableDate(item);
            return dateValue ? isSameDay(dateValue, day) : false;
          })
          .reduce((sum, item) => sum + (item.duration ?? 30), 0),
      };
    });

    return dailyData;
  };

  const dailyData = processData();
  const labels = dailyData.map((day) => day.label);

  // Line Chart Data (Completion Trends)
  const lineChartData = {
    labels,
    datasets: [
      {
        label: "Tasks Completed",
        data: dailyData.map((day) => day.tasksCompleted),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Events",
        data: dailyData.map((day) => day.events),
        borderColor: "rgb(168, 85, 247)",
        backgroundColor: "rgba(168, 85, 247, 0.2)",
        tension: 0.3,
      },
      {
        label: "Appointments",
        data: dailyData.map((day) => day.appointments),
        borderColor: "rgb(20, 184, 166)",
        backgroundColor: "rgba(20, 184, 166, 0.2)",
        tension: 0.3,
      },
    ],
  };

  // Bar Chart Data (Activity Composition)
  const barChartData = {
    labels,
    datasets: [
      {
        label: "Tasks",
        data: dailyData.map((day) => day.tasksCreated),
        backgroundColor: "rgba(59, 130, 246, 0.7)",
      },
      {
        label: "Events",
        data: dailyData.map((day) => day.events),
        backgroundColor: "rgba(168, 85, 247, 0.7)",
      },
      {
        label: "Appointments",
        data: dailyData.map((day) => day.appointments),
        backgroundColor: "rgba(20, 184, 166, 0.7)",
      },
    ],
  };

  // Time Allocation Chart
  const timeChartData = {
    labels,
    datasets: [
      {
        label: "Time Spent (mins)",
        data: dailyData.map((day) => day.totalDuration),
        borderColor: "rgb(234, 88, 12)",
        backgroundColor: "rgba(234, 88, 12, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Activity Trends (Line Chart) */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Activity Trends</h3>
          <Line
            data={lineChartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.raw}`,
                  },
                },
              },
              scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1 } },
              },
            }}
          />
        </div>

        {/* Activity Composition (Bar Chart) */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Activity Composition</h3>
          <Bar
            data={barChartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
              },
              scales: {
                x: { stacked: true },
                y: { beginAtZero: true, ticks: { stepSize: 1 }, stacked: true },
              },
            }}
          />
        </div>
      </div>

      {/* Time Allocation (Area Chart) */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Time Allocation</h3>
        <Line
          data={timeChartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.raw} minutes`,
                },
              },
            },
            scales: {
              y: { beginAtZero: true },
            },
          }}
        />
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Tasks"
          value={scheduleItems.filter((i) => i.type === "task").length}
          color="blue"
        />
        <StatCard
          title="Completed Tasks"
          value={scheduleItems.filter((i) => i.type === "task" && i.isCompleted).length}
          color="green"
        />
        <StatCard
          title="Upcoming Events"
          value={
            scheduleItems.filter((i) => i.type === "event" && new Date(i.startTime) > new Date())
              .length
          }
          color="purple"
        />
        <StatCard
          title="Appointments"
          value={scheduleItems.filter((i) => i.type === "appointment").length}
          color="teal"
        />
      </div>
    </div>
  );
}

type StatCardColor = "blue" | "green" | "purple" | "teal";

interface StatCardProps {
  title: string;
  value: number;
  color: StatCardColor;
}

const statCardColors: Record<StatCardColor, string> = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  purple: "bg-purple-50 text-purple-600",
  teal: "bg-teal-50 text-teal-600",
};

function StatCard({ title, value, color }: StatCardProps) {
  return (
    <div className={`${statCardColors[color]} rounded-lg p-4 text-center`}>
      <div className="text-sm font-medium mb-1">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
