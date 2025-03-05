"use client";

import { useEffect } from "react";

export default function RefreshToken() {
  useEffect(() => {
    const interval = setInterval(async () => {
      await fetch("http://localhost:5000/api/auth/refresh-token", {
        method: "POST",
        credentials: "include",
      });
    }, 55 * 60 * 1000); // Refresh every 55 minutes

    return () => clearInterval(interval);
  }, []);

  return null;
}
