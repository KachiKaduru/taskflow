"use client";
import { useState, useEffect } from "react";
// import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  UserCircleIcon,
  EnvelopeIcon,
  CalendarIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
  CogIcon,
  PencilSquareIcon,
  PhotoIcon,
  ArrowPathIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ProfilePage() {
  // const session = useSession();
  // const supabase = useSupabaseClient();
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "jogndoe@example.com",
    joinDate: "",
    timezone: "UTC+1",
    avatar_url: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [passwordResetEmailSent, setPasswordResetEmailSent] = useState(false);

  // Fetch user data
  // useEffect(() => {
  //   if (session?.user) {
  //     setUserData({
  //       name: session.user.user_metadata?.full_name || "User",
  //       email: session.user.email,
  //       joinDate: new Date(session.user.created_at).toLocaleDateString(),
  //       avatar_url: session.user.user_metadata?.avatar_url || "",
  //       timezone: "UTC+1",
  //     });
  //   }
  // }, [session]);

  // Mock activity data - replace with real data from your tasks
  const activityData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Tasks Completed",
        data: [3, 5, 2, 6, 4, 1, 2],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        tension: 0.3,
      },
      {
        label: "Tasks Created",
        data: [5, 4, 3, 7, 5, 3, 4],
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.5)",
        tension: 0.3,
      },
    ],
  };

  // Mock statistics - replace with real calculations
  const stats = {
    tasksCompleted: 142,
    productivityScore: 87,
    streakDays: 14,
    priorityTasks: 23,
    weeklyAverage: "5.2 tasks/day",
  };

  // const handleSave = async () => {
  //   // Update user metadata in Supabase
  //   const { error } = await supabase.auth.updateUser({
  //     data: {
  //       full_name: userData.name,
  //       timezone: userData.timezone,
  //       avatar_url: userData.avatar_url,
  //     },
  //   });

  //   if (!error) {
  //     setEditMode(false);
  //   } else {
  //     console.error("Error updating profile:", error);
  //   }
  // };

  // const handleAvatarUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   setIsUploading(true);
  //   const fileExt = file.name.split(".").pop();
  //   const fileName = `${session.user.id}-${Date.now()}.${fileExt}`;
  //   const filePath = `${fileName}`;

  //   // Upload to Supabase storage
  //   const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file);

  //   if (uploadError) {
  //     console.error("Error uploading avatar:", uploadError);
  //     setIsUploading(false);
  //     return;
  //   }

  //   // Get public URL
  //   const {
  //     data: { publicUrl },
  //   } = supabase.storage.from("avatars").getPublicUrl(filePath);

  //   // Update user with new avatar
  //   setUserData({ ...userData, avatar_url: publicUrl });
  //   setIsUploading(false);
  // };

  // const handlePasswordReset = async () => {
  //   const { error } = await supabase.auth.resetPasswordForEmail(userData.email, {
  //     redirectTo: `${window.location.origin}/auth/update-password`,
  //   });

  //   if (error) {
  //     console.error("Error sending reset email:", error);
  //   } else {
  //     setPasswordResetEmailSent(true);
  //     setTimeout(() => setPasswordResetEmailSent(false), 5000);
  //   }
  // };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Your Profile</h1>
        <button
          onClick={editMode ? handleSave : () => setEditMode(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
        >
          {editMode ? (
            <>
              <CheckCircleIcon className="h-5 w-5" />
              <span>Save Changes</span>
            </>
          ) : (
            <>
              <PencilSquareIcon className="h-5 w-5" />
              <span>Edit Profile</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              {userData.avatar_url ? (
                <img
                  src={userData.avatar_url}
                  alt="Profile"
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <UserCircleIcon className="h-24 w-24 text-gray-400" />
              )}
              {editMode && (
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                  />
                  {isUploading ? (
                    <ArrowPathIcon className="h-4 w-4 animate-spin" />
                  ) : (
                    <PhotoIcon className="h-4 w-4" />
                  )}
                </label>
              )}
            </div>

            {editMode ? (
              <input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                className="text-xl font-bold text-center mb-2 border-b border-gray-200 focus:border-blue-500 focus:outline-none"
              />
            ) : (
              <h2 className="text-xl font-bold text-center mb-2">{userData.name}</h2>
            )}

            <div className="text-gray-500 text-sm mb-6">{userData.email}</div>

            <div className="w-full space-y-4">
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-700">Member since: {userData.joinDate}</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                {editMode ? (
                  <select
                    value={userData.timezone}
                    onChange={(e) => setUserData({ ...userData, timezone: e.target.value })}
                    className="border rounded-lg p-1 text-sm"
                  >
                    <option value="UTC+0">UTC+0</option>
                    <option value="UTC+1">UTC+1</option>
                    <option value="UTC+2">UTC+2</option>
                    <option value="UTC-5">UTC-5 (EST)</option>
                    <option value="UTC-8">UTC-8 (PST)</option>
                  </select>
                ) : (
                  <span className="text-gray-700">Timezone: {userData.timezone}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Card */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <ChartBarIcon className="h-5 w-5 text-blue-500 mr-2" />
            Your Statistics
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-blue-600 font-bold text-2xl">{stats.tasksCompleted}</div>
              <div className="text-gray-600 text-sm">Completed</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-green-600 font-bold text-2xl">{stats.productivityScore}%</div>
              <div className="text-gray-600 text-sm">Productivity</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-purple-600 font-bold text-2xl">{stats.streakDays}</div>
              <div className="text-gray-600 text-sm">Day Streak</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="text-red-600 font-bold text-2xl">{stats.priorityTasks}</div>
              <div className="text-gray-600 text-sm">Priority</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <div className="text-yellow-600 font-bold text-2xl">{stats.weeklyAverage}</div>
              <div className="text-gray-600 text-sm">Daily Avg</div>
            </div>
          </div>

          {/* Activity Graph */}
          <div className="mt-4">
            <h4 className="text-md font-medium mb-4">Weekly Activity</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <Line
                data={activityData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        stepSize: 1,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
