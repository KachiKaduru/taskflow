import Link from "next/link";
import FormInput from "./form/FormInput";
import FormLabel from "./form/FormLabel";

export default function AuthForm({ formType = "loginForm" }) {
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

  if (formType === "signupForm")
    return (
      <form action="" className="space-y-2">
        {signupForm.map((field) => (
          <fieldset key={field.label}>
            <FormLabel>{field.label}</FormLabel>
            <FormInput type={field.type} name={field.name} />
          </fieldset>
        ))}

        <fieldset className="flex gap-2 pt-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-sm transition-colors disabled:opacity-50"
          >
            Sign Up
          </button>
        </fieldset>
      </form>
    );

  return (
    <form className="space-y-4" action="">
      {loginForm.map((field) => (
        <fieldset key={field.label}>
          <FormLabel>{field.label}</FormLabel>
          <FormInput type={field.type} name={field.name} />
        </fieldset>
      ))}

      <fieldset className="flex gap-2 pt-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-sm transition-colors disabled:opacity-50"
        >
          Login
        </button>
      </fieldset>
    </form>
  );
}
