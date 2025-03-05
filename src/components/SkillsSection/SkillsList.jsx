import SkillItem from "./SkillItem";

function SkillsList({ skills }) {
  if (!Array.isArray(skills) || skills.length === 0) return null; // Ensure skills is an array

  return (
    <div className="flex flex-wrap gap-4">
      {skills.map((skill, i) => (
        <SkillItem key={i} skill={skill} />
      ))}
    </div>
  );
}

export default SkillsList;
