import type { ReactNode } from "react";

interface PageHeaderProps {
  title?: string;
  children?: ReactNode;
}

export default function PageHeader({ title = "", children }: PageHeaderProps) {
  return (
    <section className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>

      {children}
    </section>
  );
}
