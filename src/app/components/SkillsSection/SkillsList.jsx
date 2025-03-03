import SkillItem from "./SkillItem";

function SkillsList({ skills }) {
  return (
    <div className="flex flex-wrap gap-4">
      {skills.map((skill, i) => (
        <SkillItem key={i} skill={skill} />
      ))}
    </div>
  );
}

export default SkillsList;
