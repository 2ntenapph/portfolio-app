import Link from "next/link";
import React from "react";

export default function ProjectsSection({ projects }) {
  // Guard against null or undefined projects
  if (!projects || !Array.isArray(projects)) {
    return null;
  }

  return (
    <section>
      <h2 className="text-3xl font-semibold mb-6 text-center">Projects</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="p-6 bg-[var(--background-soft)] shadow-lg rounded-lg border border-gray-600/40"
          >
            <Link
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-[var(--highlight)] hover:underline"
            >
              {project.name}
            </Link>
            <p className="mt-2 text-sm">{project.description}</p>
            {project.techStack && (
              <p className="text-xs text-gray-400 mt-1">
                Tech Stack: {project.techStack.join(", ")}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
