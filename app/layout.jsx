import { DM_Sans } from "next/font/google";
import "./_styles/globals.css";
import Link from "next/link";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | TaskFlow",
    default: "Welcome | TaskFlow",
  },
  description:
    "A task management app that lets users organize, track, and prioritize their activities",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.className} antialiased bg-gradient-to-br from-blue-50 to-indigo-100`}
      >
        <header>
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">TaskFlow</div>
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md transition-all"
            >
              Get Started
            </Link>
          </nav>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
