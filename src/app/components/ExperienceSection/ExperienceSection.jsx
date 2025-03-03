import React, { useState } from "react";

function ExperienceSection({ experience }) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleShowMore = (job) => {
    setSelectedJob(job);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedJob(null);
  };

  return (
    <section>
      <h2 className="text-3xl font-semibold mb-6 text-center">Experience</h2>

      <div className="relative overflow-x-auto flex space-x-6 p-4 rounded-lg bg-[var(--background-soft)] max-h-96">
        {experience.map((job, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-72 overflow-hidden p-6 bg-[var(--background)] shadow-lg rounded-lg border border-gray-600/40 relative"
          >
            <h3 className="text-xl font-semibold">{job.company}</h3>
            <p className="text-sm text-gray-400">
              {job.role} • {job.period}
            </p>
            <p className="mt-2">{job.description}</p>
            <ul className="list-disc list-inside h-full mt-2 text-gray-400 text-sm">
              {job.achievements?.map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>
            <div
              className="
                pointer-events-none
                absolute bottom-0 left-0 right-0 h-16
                bg-gradient-to-b from-transparent from-15% to-80% to-[var(--background)]
              "
            />

            <div
              className="absolute bottom-2 rounded-md right-2 p-4"
              style={{
                background: "radial-gradient(ellipse 60% 60% at center, var(--background) 30%, transparent 100%)",

              }}
            >
              <button
                className="text-[var(--highlight)] bg-[var(--background)] hover:bg-gruvbox-light-foreground 
             py-1 px-4 rounded-3xl text-sm border-[var(--highlight)] border"
                onClick={() => handleShowMore(job)}
              >
                Show More
              </button>
            </div>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-[var(--background)] bg-opacity-80 flex items-center justify-center p-4">
          <div className="bg-[var(--background)] text-[var(--foreground)] p-6 rounded-xl shadow-2xl max-w-lg w-full relative border border-[var(--highlight)]">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-[var(--highlight)] hover:text-[var(--primary)] text-lg font-bold"
              onClick={handleClosePopup}
            >
              ✕
            </button>

            {/* Company & Role */}
            <h3 className="text-2xl font-bold text-[var(--highlight)]">
              {selectedJob.company}
            </h3>
            <p className="text-sm text-[var(--secondary)] mt-1">
              {selectedJob.role} • {selectedJob.period}
            </p>

            {/* Description */}
            <p className="mt-4">
              {selectedJob.description}
            </p>

            {/* Achievements List */}
            <ul className="list-disc list-inside mt-4 text-sm space-y-1">
              {selectedJob.achievements?.map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>

            {/* Close Button */}
            <button
              className="mt-5 block mx-auto text-[var(--highlight)] hover:text-[var(--primary)] font-semibold"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default ExperienceSection;
