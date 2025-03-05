"use client";

import { useState, useEffect } from "react";
import SkillSection from "./SkillsSection/SkillsSection";
import ProfileDescription from "./ProfileDescription/ProfileDescription";
import ContactLinks from "./UI/ContactLinks";
import ExperienceSection from "./ExperienceSection/ExperienceSection";
import ProjectsSection from "./ProjectsSection/ProjectsSection";
import EducationList from "./EducationSection/EducationList";
import GetResume from "./GetResume";

export default function ProfileClient({ profile }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

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
          <div className="flex flex-col w-full space-y-6 flex-1 min-h-full">
            <ProfileDescription description={profile.description} />
            <EducationList education={profile.education} />
          </div>

          <div className="flex-1">
            <SkillSection skills={profile.skills} />
          </div>
        </section>

        <section className="max-w-4xl w-full mb-12">
          <ExperienceSection experience={profile.experience} />
        </section>

        <section className="max-w-4xl w-full mb-12">
          <ProjectsSection projects={profile.projects} />
        </section>

        <section className="flex justify-center">
            <GetResume resume={profile.resume} />
        </section>
      </main>
    </div>
  );
}
