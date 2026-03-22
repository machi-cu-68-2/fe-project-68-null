import Link from "next/link";
import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <div
      className="min-h-screen bg-[#fefaec] flex items-center
     justify-center px-6 py-24"
    >
      <div
        className="w-full max-w-xl bg-white rounded-[2.5rem] 
      shadow-2xl border-2 border-[#f8e9a1] overflow-hidden"
      >
        <div className="p-10 md:p-14">
          <div className="text-center mb-10">
            <h1
              className="font-playfair-display font-bold text-4xl
             text-[#724a15] mb-2"
            >
              Create Account
            </h1>
            <p className="text-[rgba(139,69,21,0.6)]">
              Join our exclusive community of food lovers
            </p>
          </div>

          <SignUpForm />

          <div className="mt-10 pt-8 border-t border-[#f8e9a1] text-center">
            <p className="text-[rgba(139,69,21,0.6)] text-sm">
              Already have an account?{" "}
              <Link
                href="/signIn"
                className="text-[#ce7b11] font-bold hover:underline"
              >
                Sign in instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
