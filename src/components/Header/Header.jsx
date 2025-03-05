"use client";

import React from "react";
import ToggleThemeButton from "../UI/ToggleThemeButton";

export default function Header() {
  return (
    <header className="flex justify-end items-center w-full h-16 px-8 bg-[var(--background)]">
      <ToggleThemeButton />
    </header>
  );
}

