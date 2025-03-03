import EducationItem from "./EducationItem";

function EducationList({ education }) {
  return (
    <div className="rounded-lg bg-[var(--background-soft)] backdrop-blur-md flex flex-col justify-center">
      <h2 className="text-3xl font-semibold mb-2 text-left text-[var(--highlight)]">
        Education
      </h2>
      <div className="flex flex-wrap gap-3">
        {education.map((institute, i) => (
          <EducationItem key={i} institute={institute} />
        ))}
      </div>
    </div>
  );
}

export default EducationList;
