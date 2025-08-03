# 📆 Taskflow – Calendar & Productivity Tracker

**Taskflow** is a calendar-first task management web app that helps users create and track tasks, events, and appointments — with automatic **Google Calendar integration**. Built with **Next.js**, **Supabase**, and **React Query (Tanstack)**, it offers smooth performance and a beautiful UI to help users stay productive.

[🔗 Live Demo](https://taskflow-inc.vercel.app/)  

---

## Description
Taskflow was designed to help people track time and stay productive by blending task management with calendar-driven scheduling. It leverages Google Calendar for synchronization and Supabase for backend data.

Sign in with your **Google account** to manage your tasks, schedule events, and keep appointments — all synced in real-time with your Google Calendar. Visualize your productivity using the built-in calendar and daily activity graph.

---

## Features

- 🔐 Google OAuth via Auth.js
- ✅ Create tasks, events, and appointments
- 📅 Full calendar view for managing entries
- 🔄 Seamless sync with Google Calendar
- 📈 Activity tracking through graphs and visual stats
- 💡 Clean, responsive UI with TailwindCSS
- 🧠 Server-side state handled efficiently with React Query and Supabase

---

## Tech Stack

- Next.js (App Router)
- React Query (TanStack Query)
- Supabase (Auth, DB, and Realtime)
- Auth.js
- TailwindCSS

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/KachiKaduru/taskflow.git

# Navigate into the directory
cd taskflow

# Install dependencies
npm install

# Run the development server
npm run dev

# Visit http://localhost:3000 to view locally.
Note: You’ll need to configure Supabase and Google OAuth credentials to make authentication and calendar syncing work during development.
