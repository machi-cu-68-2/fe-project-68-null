"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import userRegister from "@/lib/userRegister";

export default function SignUpPage() {
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await userRegister(name, tel, email, password);
      // Success! Redirect to sign-in
      router.push("/signIn?registered=true");
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fefaec] flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl border-2 border-[#f8e9a1] overflow-hidden">
        <div className="p-10 md:p-14">
          <div className="text-center mb-10">
            <h1 className="font-playfair-display font-bold text-4xl text-[#724a15] mb-2">Create Account</h1>
            <p className="text-[rgba(139,69,21,0.6)]">Join our exclusive community of food lovers</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="name" className="font-playfair-display font-semibold text-[#724a15] text-sm ml-1">Full Name</label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="bg-[#fefaec] border-2 border-[#f8e9a1] rounded-2xl px-5 py-3.5 text-[#724a15] outline-none focus:border-[#ce7b11] transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="tel" className="font-playfair-display font-semibold text-[#724a15] text-sm ml-1">Telephone</label>
              <input
                id="tel"
                type="tel"
                required
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                placeholder="0812345678"
                className="bg-[#fefaec] border-2 border-[#f8e9a1] rounded-2xl px-5 py-3.5 text-[#724a15] outline-none focus:border-[#ce7b11] transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-playfair-display font-semibold text-[#724a15] text-sm ml-1">Email Address</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="bg-[#fefaec] border-2 border-[#f8e9a1] rounded-2xl px-5 py-3.5 text-[#724a15] outline-none focus:border-[#ce7b11] transition-all"
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="password" className="font-playfair-display font-semibold text-[#724a15] text-sm ml-1">Password</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-[#fefaec] border-2 border-[#f8e9a1] rounded-2xl px-5 py-3.5 text-[#724a15] outline-none focus:border-[#ce7b11] transition-all"
              />
            </div>

            {error && (
              <div className="md:col-span-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 w-full bg-[#ce7b11] hover:bg-[#e8a118] disabled:bg-[#ce7b11]/50 disabled:cursor-not-allowed text-white font-playfair-display font-bold text-xl py-4 rounded-full shadow-lg shadow-[#ce7b11]/20 active:scale-[0.98] transition-all mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : "Create Account"}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-[#f8e9a1] text-center">
            <p className="text-[rgba(139,69,21,0.6)] text-sm">
              Already have an account?{" "}
              <Link href="/signIn" className="text-[#ce7b11] font-bold hover:underline">
                Sign in instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
