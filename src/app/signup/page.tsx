"use client"; // If using App Router

import { useState } from "react";

export default function RegisterPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    occupation: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [checkingEmail, setCheckingEmail] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Reset errors when user starts typing again
    if (name === "email") setEmailError("");
    if (name === "password" || name === "confirmPassword") {
      setPasswordError("");
    }

    // ✅ Live password confirmation check when user types confirmPassword
    if (name === "confirmPassword") {
      if (value !== formData.password) {
        setPasswordError("Passwords do not match.");
      } else {
        setPasswordError("");
      }
    }
  };

  // API Call to check email availability
  const checkEmailAvailability = async (email:any) => {
    setCheckingEmail(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/check-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setEmailError(data.available ? "" : "This email is already registered.");
    } catch (error) {
      setEmailError("");
    } finally {
      setCheckingEmail(false);
    }
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    // Proceed with registration logic
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        occupation: "",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-md p-8 space-y-6 rounded-lg">
        <h2 className="text-2xl font-bold text-center text-[var(--foreground)]">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-[var(--foreground)] font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => checkEmailAvailability(formData.email)}
              required
              className="w-full px-4 py-2 border border-[var(--foreground)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
            {checkingEmail && <p className="text-sm text-[var(--highlight)]">Checking email...</p>}
            {emailError && <p className="text-sm text-red-500">{emailError}</p>}
          </div>

          {/* Full Name Input */}
          <div>
            <label htmlFor="fullName" className="block text-[var(--foreground)] font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[var(--foreground)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          {/* Occupation Input */}
          <div>
            <label htmlFor="occupation" className="block text-[var(--foreground)] font-medium">Occupation</label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[var(--foreground)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-[var(--foreground)] font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[var(--foreground)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-[var(--foreground)] font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[var(--foreground)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
            {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-[var(--primary)] rounded-md transition duration-300 hover:bg-[var(--highlight)]"
            disabled={!!emailError} // Disable if email is taken
          >
            Register
          </button>
        </form>

        {/* Already have an account */}
        <p className="text-center text-[var(--foreground)]">
          Already have an account? <a href="/" className="text-[var(--highlight)] hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}
