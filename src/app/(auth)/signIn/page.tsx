import Link from "next/link";
import { Suspense } from "react";
import SignInForm from "@/components/auth/SignInForm";

export default function SignInPage() {
  return (
    <div
      className="min-h-screen bg-[#fefaec] flex items-center
     justify-center px-6 py-24"
    >
      <div
        className="w-full max-w-md bg-white rounded-[2.5rem]
       shadow-2xl border-2 border-[#f8e9a1] overflow-hidden"
      >
        <div className="p-10">
          <div className="text-center mb-10">
            <h1
              className="font-playfair-display font-bold text-4xl
             text-[#724a15] mb-2"
            >
              Welcome Back
            </h1>
            <p className="text-[rgba(139,69,21,0.6)]">
              Sign in to continue your culinary journey
            </p>
          </div>

          <Suspense
            fallback={<div className="text-center p-4">Loading form...</div>}
          >
            <SignInForm />
          </Suspense>

          <div className="mt-10 pt-8 border-t border-[#f8e9a1] text-center">
            <p className="text-[rgba(139,69,21,0.6)] text-sm">
              Don't have an account?{" "}
              <Link
                href="/signUp"
                className="text-[#ce7b11] font-bold hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
