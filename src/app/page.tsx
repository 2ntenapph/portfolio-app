"use client";

import Link from "next/link";
import { profiles } from "./mainPageText";

export default function HomePage() {
  return (
    <div className="min-h-screen p-8 sm:p-16 font-sans">
      <h1 className="text-4xl font-bold mb-6">Profiles</h1>
      <ul className="space-y-2">
        {profiles.map((profile) => (
          <li key={profile.slug}>
            <Link
              href={`/${profile.slug}`}  // <--- dynamic route
              className="text-blue-500 hover:underline"
            >
              {profile.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
