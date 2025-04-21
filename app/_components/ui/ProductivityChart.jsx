"use client";
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
} from "chart.js";

import { useMemo } from "react";
import { useAppointments, useEvents, useTasks } from "@/app/_hooks/useReactQuery";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ProductivityChart = () => {
  const { data: tasks = [] } = useTasks();
  const { data: events = [] } = useEvents();
  const { data: appointments = [] } = useAppointments();

  // Process data for the last 7 days
  const { completionData, productivityData, eventDistribution } = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 6);

    const completionRates = Array(7).fill(0);
    const productivityScores = Array(7).fill(0);
    const eventCounts = Array(7).fill(0);
    const appointmentCounts = Array(7).fill(0);

    // Process tasks
    tasks.forEach((task) => {
      const taskDate = new Date(task.dueDate);
      if (taskDate >= lastWeek && taskDate <= today) {
        const dayIndex = taskDate.getDay(); // 0 (Sun) to 6 (Sat)
        if (task.isCompleted) {
          completionRates[dayIndex]++;
        }
        // Simple productivity score calculation
        productivityScores[dayIndex] += task.isPriority ? 15 : 10;
      }
    });

    // Process events
    events.forEach((event) => {
      const eventDate = new Date(event.startTime);
      if (eventDate >= lastWeek && eventDate <= today) {
        const dayIndex = eventDate.getDay();
        eventCounts[dayIndex]++;
        productivityScores[dayIndex] += 5; // Events contribute to productivity
      }
    });

    // Process appointments
    appointments.forEach((appt) => {
      const apptDate = new Date(appt.date);
      if (apptDate >= lastWeek && apptDate <= today) {
        const dayIndex = apptDate.getDay();
        appointmentCounts[dayIndex]++;
        productivityScores[dayIndex] += 7; // Appointments contribute to productivity
      }
    });

    // Normalize completion rates to percentage
    const totalTasksPerDay = tasks.reduce((acc, task) => {
      const taskDate = new Date(task.dueDate);
      if (taskDate >= lastWeek && taskDate <= today) {
        const dayIndex = taskDate.getDay();
        acc[dayIndex]++;
      }
      return acc;
    }, Array(7).fill(0));

    const completionData = completionRates.map((completed, i) =>
      totalTasksPerDay[i] ? Math.round((completed / totalTasksPerDay[i]) * 100) : 0
    );

    // Normalize productivity scores (0-100 scale)
    const maxProductivity = Math.max(...productivityScores, 1);
    const normalizedProductivity = productivityScores.map((score) =>
      Math.round((score / maxProductivity) * 100)
    );

    return {
      completionData,
      productivityData: normalizedProductivity,
      eventDistribution: days.map((day, i) => ({
        day,
        events: eventCounts[i],
        appointments: appointmentCounts[i],
      })),
    };
  }, [tasks, events, appointments]);

  const chartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Task Completion %",
        data: completionData,
        borderColor: "rgba(79, 70, 229, 1)",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        tension: 0.4,
        fill: true,
        yAxisID: "y",
      },
      {
        label: "Productivity Score",
        data: productivityData,
        borderColor: "rgba(16, 185, 129, 1)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        fill: true,
        yAxisID: "y",
      },
    ],
  };

  const distributionData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Events",
        data: eventDistribution.map((d) => d.events),
        backgroundColor: "rgba(59, 130, 246, 0.7)",
      },
      {
        label: "Appointments",
        data: eventDistribution.map((d) => d.appointments),
        backgroundColor: "rgba(245, 158, 11, 0.7)",
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Main Productivity Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Weekly Productivity Overview</h2>
        <div className="h-80">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              interaction: {
                mode: "index",
                intersect: false,
              },
              plugins: {
                legend: {
                  position: "top",
                },
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      let label = context.dataset.label || "";
                      if (label) label += ": ";
                      label += context.parsed.y + "%";
                      return label;
                    },
                  },
                },
              },
              scales: {
                y: {
                  min: 0,
                  max: 100,
                  ticks: {
                    callback: (value) => value + "%",
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Event Distribution Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Schedule Distribution</h2>
        <div className="h-80">
          <Bar
            data={distributionData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top",
                },
              },
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductivityChart;
