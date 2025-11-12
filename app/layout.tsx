import type { ReactNode } from "react";
import { DM_Sans } from "next/font/google";
import "./_styles/globals.css";

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

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased `}>{children}</body>
    </html>
  );
}
