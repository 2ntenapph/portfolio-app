import Image from "next/image";

function EducationItem({ institute }) {
  return (
    <div
      className="
        relative group flex items-start 
        transition-all duration-1000 ease-in-out 
        hover:w-max hover:rounded-lg
      "
    >
      <div
        className="
          inline-flex items-start w-fit gap-3 p-3
          bg-[var(--foreground-light)] rounded-lg
          overflow-hidden transition-all duration-1000 ease-in-out 
          hover:w-max hover:rounded-lg
        "
      >
        <div className="inline-flex items-start gap-2 w-fit h-fit">
          <Image
            src={`./icons/${institute.icon}`}
            alt={institute.name}
            width={12}
            height={12}
            className="w-10 h-8"
          />
          <div className="flex flex-col">
            <span className="text-base text-[var(--foreground)] font-semibold overflow-hidden whitespace-nowrap">
              {institute.name}
            </span>
            <span className="text-sm text-[var(--highlight)] ml-auto">
              {institute.degree}
            </span>
          </div>
        </div>

        {/* Hoverable Details Section */}
        <div
          className="
          hidden
          group-hover:flex flex-col text-[7px] text-[var(--foreground)] font-medium 
          whitespace-nowrap
        "
        >
          <strong className="text-[var(--foreground)]">Field:</strong> {institute.field}
          <strong className="text-[var(--foreground)]">Years:</strong> {institute.years}
        </div>
      </div>
    </div>
  );
}

export default EducationItem;
