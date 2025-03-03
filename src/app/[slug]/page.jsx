import { profiles } from "../mainPageText";
import ProfileClient from "../components/ProfileClient";

// Generate static paths for GitHub Pages deployment
export async function generateStaticParams() {
  return profiles.map((profile) => ({ slug: profile.slug }));
}

export default function ProfilePage({ params }) {
  const { slug } = params;
  const profile = profiles.find((p) => p.slug === slug);

  if (!profile) {
    return <h1 className="text-2xl font-bold p-8">Profile not found.</h1>;
  }

  return <ProfileClient profile={profile} />;
}
