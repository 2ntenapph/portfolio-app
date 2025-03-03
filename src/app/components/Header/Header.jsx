"use client";

import React from "react";
import ToggleThemeButton from "../UI/ToggleThemeButton";

export default function Header() {
  return (
    <header className="flex justify-end items-center w-full mb-12">
      <ToggleThemeButton />
    </header>
  );
}
