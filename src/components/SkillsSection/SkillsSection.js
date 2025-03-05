import { useState, useRef } from "react";
import SkillCategory from "./SkillCategory";

export default function SkillsSection({ skills }) {
  const [expanded, setExpanded] = useState(false);

  // Entire section ref
  const sectionRef = useRef(null);
  // Scrollable container ref
  const scrollableRef = useRef(null);

  if (!skills) return "No skills were added";

  const toggleExpand = () => {
    // If it's about to expand...
    if (!expanded) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    // If it's about to collapse...
    else {
      // Reset inner scroll to top
      if (scrollableRef.current) {
        scrollableRef.current.scrollTop = 0;
      }
      // Then scroll entire section into view
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    // Finally toggle the state
    setExpanded((prev) => !prev);
  };

  return (
    <div>
      <div className="flex flex-col justify-center h-full" ref={sectionRef}>
        {/* Section Title */}
        <h2 className="text-3xl font-semibold mb-2 text-left text-[var(--highlight)]">
          Skills
        </h2>

        {/* Parent Wrapper for the scrollable area and overlays */}
        <div className="relative flex flex-col transition-all duration-500 ease-in-out">
          {/* Main content area */}
          <div
            ref={scrollableRef}
            className={`
            flex flex-col gap-6
            overflow-y-auto
            rounded-lg
            transition-all duration-500 ease-in-out
            ${expanded ? "max-h-[9999px]" : "max-h-96"}
          `}
          >
            {skills.map((skillsGroup) => (
              <SkillCategory
                key={skillsGroup.title}
                category={skillsGroup.title}
                skills={skillsGroup.list}
              />
            ))}
          </div>

          {/* Gradient overlays only visible when NOT expanded */}
          {!expanded && (
            <>
              {/* Top Fade */}
              <div
                className="
                pointer-events-none
                absolute top-0 left-0 right-0 h-3
                bg-gradient-to-b from-[var(--background)] to-transparent
              "
              />
              {/* Bottom Fade */}
              <div
                className="
                pointer-events-none
                absolute bottom-0 left-0 right-0 h-16
                bg-gradient-to-b from-transparent to-[var(--background)]
              "
              />
            </>
          )}
        </div>
      </div>
      {/* Toggle Button */}
      <button
        onClick={toggleExpand}
        className="mx-auto block px-6 py-2 text-sm font-medium text-center text-[var(--highlight)]
                border border-[var(--highlight)] rounded-full
                transition-colors duration-300 ease-in-out
                hover:bg-[var(--highlight)] hover:text-[var(--background)] mt-4"
      >
        {expanded ? "View Less" : "View More..."}
      </button>
    </div>
  );
}
