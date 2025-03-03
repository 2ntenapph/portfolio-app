"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { profiles } from "../mainPageText";

import SkillSection from "../components/SkillsSection/SkillsSection";
import ProfileDescription from "../components/ProfileDescription/ProfileDescription";
import ContactLinks from "../components/UI/ContactLinks";
import ExperienceSection from "../components/ExperienceSection/ExperienceSection";
import ProjectsSection from "../components/ProjectsSection/ProjectsSection";
import EducationList from "../components/EducationSection/EducationList";

export default function ProfilePage() {
  const [theme, setTheme] = useState("dark"); // or 'light'
  const pathname = usePathname();
  const slug = pathname.replace("/", "");

  // Find the profile that matches the slug
  const profile = profiles.find((p) => p.slug === slug);

  // Toggle dark mode in <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // If profile not found, show 404-like message
  if (!profile) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Profile not found.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 sm:p-16 font-sans bg-[var(--background)] text-[var(--foreground)] transition-all">
      <main className="flex flex-col items-center gap-12">
        <h1 className="text-5xl font-extrabold text-center flex-1 tracking-wide drop-shadow-md">
          {profile.name}
        </h1>

        {/* Contact / Socials */}
        <section className="flex justify-center gap-6">
          <ContactLinks contact={profile.contact} />
        </section>

        <section className="flex flex-col md:flex-row gap-12 items-stretch max-w-6xl w-full mx-auto h-full">
          {/* Left Column: Profile Description + Education */}
          <div className="flex flex-col w-full space-y-6 flex-1 min-h-full">
            <ProfileDescription description={profile.description} />
            <EducationList education={profile.education} />
          </div>

          {/* Right Column: Skills (ensures equal height) */}
          <div className="flex-1">
            <SkillSection skills={profile.skills} />
          </div>
        </section>

        {/* Experience */}
        <section className="max-w-4xl w-full mb-12">
          <ExperienceSection experience={profile.experience} />
        </section>

        {/* Projects */}
        <section className="max-w-4xl w-full mb-12">
          <ProjectsSection projects={profile.projects} />
        </section>
      </main>
    </div>
  );
}
