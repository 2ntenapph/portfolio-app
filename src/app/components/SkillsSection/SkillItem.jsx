import Image from "next/image";

function SkillItem({ skill }) {
  return (
    <div
      className="
        relative group flex items-center 
        transition-all duration-1000 ease-in-out 
        hover:w-max hover:rounded-[50px]
      "
    >
      <div
        className="
          flex items-center w-12 h-12 
          bg-gruvbox-light-foreground rounded-full 
          overflow-hidden transition-all duration-1000 ease-in-out 
          hover:w-max hover:rounded-[50px]
        "
      >
        <Image
          src={`./icons/tools/${skill.icon}`}
          alt={skill.name}
          width={12}
          height={12}
          className="w-8 h-8 m-2"
        />
        <span
          className="
            pr-4 text-sm text-white font-medium 
            whitespace-nowrap transform scale-x-0 opacity-0 origin-left 
            transition-all duration-300 ease-in-out 
            group-hover:scale-x-100 group-hover:opacity-100
          "
        >
          {skill.name}
        </span>
      </div>
    </div>
  );
}

export default SkillItem;
