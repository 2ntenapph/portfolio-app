import Link from "next/link";

export default function GetResume({ resume }) {
  // Guard against undefined or null resume
  if (!resume) return <p className="text-gruvbox-light-foreground-light text-center">No resume was added</p>;

  return (
    <div className="flex justify-center">
      <Link
        href={`./files/resumes/${resume.resumeUrl}`}
        download="resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-2 rounded-lg shadow-md text-gruvbox-light-background bg-gruvbox-light-primary 
        transition duration-300 transform hover:scale-105 hover:bg-gruvbox-light-highlight"
      >
        Download Resume
      </Link>
    </div>
  );
}
