"use client";

import { useState } from "react";
import Link from "next/link";
import FormInput from "./form/FormInput";
import FormLabel from "./form/FormLabel";
import { signup, login } from "../_lib/actions/authActions";

export default function AuthForm({ formType = "loginForm" }) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = [
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Password" },
  ];

  const signupForm = [
    { name: "fullName", type: "text", label: "Full Name" },
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Password" },
    { name: "confirmPassword", type: "password", label: "Confirm Password" },
  ];

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);

    try {
      const result = formType === "signupForm" ? await signup(formData) : await login(formData);

      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      }
      // If no error, redirect will happen in the action
    } catch (err) {
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  }

  if (formType === "signupForm")
    return (
      <form action={handleSubmit} className="space-y-2">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        {signupForm.map((field) => (
          <fieldset key={field.label}>
            <FormLabel>{field.label}</FormLabel>
            <FormInput type={field.type} name={field.name} />
          </fieldset>
        ))}

        <fieldset className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </fieldset>
      </form>
    );

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      {loginForm.map((field) => (
        <fieldset key={field.label}>
          <FormLabel>{field.label}</FormLabel>
          <FormInput type={field.type} name={field.name} />
        </fieldset>
      ))}

      <fieldset className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </fieldset>
    </form>
  );
}
