
import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  children: ReactNode;
  error?: string;
};

export default function FormField({
  label,
  htmlFor,
  children,
  error,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      {children}

      {error && (
        <p id={`${htmlFor}-error`} className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
