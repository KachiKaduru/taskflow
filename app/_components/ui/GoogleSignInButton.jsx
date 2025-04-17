import { signInWithGoogle } from "@/app/_lib/actions/userActions";
import { GoogleIcon } from "../_icons/icons";

export default function GoogleSignInButton({ type = "login" }) {
  return (
    <form action={signInWithGoogle}>
      <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:border-gray-400 rounded-lg py-3 px-6 shadow-sm transition-colors mb-4 disabled:opacity-50">
        <GoogleIcon />
        <span>{type === "signup" ? "Sign up" : "Continue"} with Google</span>
      </button>
    </form>
  );
}
