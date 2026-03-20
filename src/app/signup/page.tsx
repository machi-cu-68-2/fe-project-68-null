"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* ===== Left: Gradient panel (เหมือน Sign in) ===== */}
      <div
        className="hidden lg:flex w-[46%] shrink-0 flex-col items-center justify-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(127deg, #e8a118 0%, #ce7b11 50%, #8b4515 100%)",
        }}
      >
        {/* Decorative circles */}
        <div className="absolute top-[-80px] left-[-80px] w-[320px] h-[320px] rounded-full bg-white/10" />
        <div className="absolute bottom-[-60px] right-[-60px] w-[240px] h-[240px] rounded-full bg-white/10" />
        <div className="absolute top-[20%] right-[-40px] w-[160px] h-[160px] rounded-full bg-white/[0.07]" />

        {/* Logo icon */}
        <div className="bg-white/20 rounded-2xl w-24 h-24 flex items-center justify-center shadow-xl mb-6 backdrop-blur-sm">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="#fefaec">
            <path d="M11 2C8.8 2 7 3.8 7 6v6H5v2h2v8h4v-8h2v8h4v-8h2v-2h-2V6c0-2.2-1.8-4-4-4zm0 2c1.1 0 2 .9 2 2v6h-4V6c0-1.1.9-2 2-2z" />
          </svg>
        </div>

        {/* Brand */}
        <h1 className="font-playfair-display font-bold text-[3.75rem] text-[#fefaec] leading-none mb-2">
          Saveur
        </h1>
        <p className="font-playfair-display italic text-white/70 text-xl">
          Your table awaits
        </p>

        {/* Tagline card */}
        <div className="mt-12 mx-10 bg-white/10 backdrop-blur-sm rounded-2xl px-7 py-5 border border-white/20 text-center max-w-xs">
          <p className="text-white/90 text-sm leading-relaxed font-inter">
            Join thousands of food lovers discovering the world's finest dining experiences
          </p>
        </div>
      </div>

      {/* ===== Right: Sign up form ===== */}
      <div className="flex-1 bg-[#fefaec] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[340px]">

          {/* Heading */}
          <div className="mb-8">
            <h2 className="font-playfair-display font-bold text-[2.25rem] text-[#724a15] leading-tight mb-1">
              Create account
            </h2>
            <p className="text-sm text-[rgba(139,69,21,0.6)]">
              Start your fine dining journey today
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4">

            {/* Full name */}
            <div className="flex flex-col gap-1.5">
              <label className="font-playfair-display font-semibold text-[#724a15] text-sm">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="bg-white border-2 border-[#f8e9a1] rounded-[14px] px-4 h-[52px] text-[#724a15] text-base outline-none focus:border-[#e8a118] transition-colors placeholder:text-[rgba(139,69,21,0.35)]"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="font-playfair-display font-semibold text-[#724a15] text-sm">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="bg-white border-2 border-[#f8e9a1] rounded-[14px] px-4 h-[52px] text-[#724a15] text-base outline-none focus:border-[#e8a118] transition-colors placeholder:text-[rgba(139,69,21,0.35)]"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="font-playfair-display font-semibold text-[#724a15] text-sm">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-white border-2 border-[#f8e9a1] rounded-[14px] px-4 pr-11 h-[52px] text-[#724a15] text-base outline-none focus:border-[#e8a118] transition-colors placeholder:text-[rgba(139,69,21,0.35)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(139,69,21,0.4)] hover:text-[#724a15] transition-colors"
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div className="flex flex-col gap-1.5">
              <label className="font-playfair-display font-semibold text-[#724a15] text-sm">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-white border-2 border-[#f8e9a1] rounded-[14px] px-4 pr-11 h-[52px] text-[#724a15] text-base outline-none focus:border-[#e8a118] transition-colors placeholder:text-[rgba(139,69,21,0.35)]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(139,69,21,0.4)] hover:text-[#724a15] transition-colors"
                >
                  {showConfirm ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-2.5 cursor-pointer mt-1">
              <div className="relative mt-0.5 shrink-0">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="sr-only"
                />
                <div
                  onClick={() => setAgreed(!agreed)}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                    agreed
                      ? "bg-[#e8a118] border-[#e8a118]"
                      : "bg-white border-[#f2d257]"
                  }`}
                >
                  {agreed && (
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5">
                      <polyline points="2,6 5,9 10,3" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm text-[rgba(139,69,21,0.7)] leading-snug">
                I agree to the{" "}
                <span className="text-[#e8a118] font-semibold cursor-pointer hover:underline">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-[#e8a118] font-semibold cursor-pointer hover:underline">
                  Privacy Policy
                </span>
              </span>
            </label>

            {/* Submit button */}
            <button
              className={`w-full h-[52px] rounded-full font-playfair-display font-semibold text-lg text-white shadow-md transition-all mt-1 ${
                agreed
                  ? "bg-[#e8a118] hover:bg-[#ce7b11] active:scale-[0.98]"
                  : "bg-[rgba(232,161,24,0.4)] cursor-not-allowed"
              }`}
              disabled={!agreed}
            >
              Create Account
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-[#f8e9a1]" />
            <span className="text-sm text-[rgba(139,69,21,0.5)] font-playfair-display">or</span>
            <div className="flex-1 h-px bg-[#f8e9a1]" />
          </div>

          {/* Sign in link */}
          <p className="text-center text-sm text-[rgba(139,69,21,0.7)]">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold text-[#e8a118] hover:underline"
            >
              Sign in
            </Link>
          </p>

          {/* Back to home */}
          <div className="border-t border-[#f8e9a1] mt-6 pt-5">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-[rgba(139,69,21,0.6)] hover:text-[#724a15] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
