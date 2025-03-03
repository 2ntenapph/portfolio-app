import SkillsList from "./SkillsList";

function SkillCategory({ category, skills }) {
  // Simple transformation for display
  const displayName = category.replace(/([A-Z])/g, " $1").trim();

  // If `skills` is another nested object with subcategories, handle that
  if (typeof skills === "object" && !Array.isArray(skills)) {
    return (
      <div className="p-1 ">
        <h3 className="text-md font-semibold text-[var(--foreground)] mb-1 uppercase tracking-wide">
          {displayName}
        </h3>
        {Object.entries(skills).map(([subCategory, subSkills]) => (
          <div key={subCategory} className="pl-4">
            <h4 className="text-sm font-medium text-gray-400">
              {subCategory}
            </h4>
            <SkillsList skills={subSkills} />
          </div>
        ))}
      </div>
    );
  }

  // Otherwise, it's just a plain array of skills
  return (
    <div className="p-1 ">
      <h3 className="text-md font-semibold text-[var(--foreground)] mb-1 uppercase tracking-wide">
        {displayName}
      </h3>
      <SkillsList skills={skills} />
    </div>
  );
}

export default SkillCategory;
