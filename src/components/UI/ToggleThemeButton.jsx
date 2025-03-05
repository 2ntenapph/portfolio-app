"use client";

import { useEffect, useState } from "react";

export default function ToggleThemeButton() {
  const [theme, setTheme] = useState("dark"); // Default to dark mode

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-20 h-10 flex items-center rounded-full transition-all duration-300 mt-8 mx-8
        ${
          theme === "dark"
            ? "bg-gruvbox-dark-primary"
            : "bg-gruvbox-light-primary"
        }
      `}
    >
      {/* Toggle Circle */}
      <div
        className={`absolute w-8 h-8 rounded-full shadow-md transition-all duration-300 flex items-center justify-center 
          ${
            theme === "dark"
              ? "translate-x-10 bg-gruvbox-dark-foreground text-gruvbox-dark-background"
              : "translate-x-1 bg-gruvbox-light-foreground text-gruvbox-light-background"
          }
        `}
      >
        {/* You could optionally insert an icon or text here */}
      </div>
    </button>
  );
}
