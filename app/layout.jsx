import { DM_Sans } from "next/font/google";
import { TaskProvider } from "./_contexts/TaskContent";
import "./_styles/globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Taskflow",
  description: "Plan your activities",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased`}>
        <TaskProvider>{children}</TaskProvider>
      </body>
    </html>
  );
}
