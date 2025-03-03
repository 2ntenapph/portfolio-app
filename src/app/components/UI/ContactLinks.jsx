import Image from "next/image";
import React from "react";

export default function ContactLinks({ contact }) {
  // Guard against undefined or null contact
  if (!contact) {
    return null;
  }

  return (
    <div className="flex space-x-4">
      {Object.entries(contact).map(([key, url]) => (
        <a 
          key={key} 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Image
            src={`./icons/${key}.svg`}
            alt={key}
            width={36}
            height={36}
            className="transition duration-300 transform hover:scale-125 hover:brightness-125"
          />
        </a>
      ))}
    </div>
  );
}
