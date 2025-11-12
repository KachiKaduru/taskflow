import type { ReactNode } from "react";

interface FormLabelProps {
  children: ReactNode;
}

export default function FormLabel({ children }: FormLabelProps) {
  return <label className="block text-sm font-medium text-gray-700 mb-1">{children}</label>;
}
