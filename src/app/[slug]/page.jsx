"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import ProfileClient from "../../components/ProfileClient";

export default function ProfilePage() {
  const { slug } = useParams();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://back-production-ea87.up.railway.app";

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/api/profiles/slug/${slug}`);

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Profile not found");
        }

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [slug]);

  if (loading) return <h1 className="text-2xl font-bold p-8">Loading...</h1>;

  // 🔴 Redirect to 404 if an error occurs or profile is not found
  if (error || !profile) {
    notFound(); // ✅ Triggers Next.js 404 page
  }

  return <ProfileClient profile={profile} />;
}
