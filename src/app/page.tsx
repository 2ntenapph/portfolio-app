"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Reset errors before new attempt

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // ✅ Send HTTP-only cookies
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Login failed");
      }

      alert("Login successful!");
      router.push("/upload"); // ✅ Redirect after login
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-md p-8 space-y-6 rounded-lg">
        <h2 className="text-2xl font-bold text-center text-[var(--foreground)]">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-[var(--foreground)] font-medium">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-[var(--foreground)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-[var(--foreground)] font-medium">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-[var(--foreground)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          {/* Error Message */}
          {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-[var(--primary)] rounded-md transition duration-300 hover:bg-[var(--highlight)]"
          >
            Sign In
          </button>
        </form>

        {/* Signup or Forgot Password */}
        <p className="text-center text-[var(--foreground)]">
          Don't have an account? <Link href="/signup" className="text-[var(--highlight)] hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
