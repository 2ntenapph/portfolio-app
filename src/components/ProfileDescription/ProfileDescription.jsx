import React from "react";

export default function ProfileDescription({ description }) {
  // If profile is null/undefined, return nothing or some fallback
  if (!description) return null;

  // Safely split the description into paragraphs if it exists
  const paragraphs = description?.split("\n") || [];

  return (
    <div className="rounded-lg bg-[var(--background-soft)] backdrop-blur-md flex flex-col justify-center">
      <h2 className="text-3xl font-semibold mb-2 text-left text-[var(--highlight)]">
        Description
      </h2>
      {/* Description Paragraphs */}
      <div className="mt-4 text-gray-400 leading-relaxed space-y-4">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
