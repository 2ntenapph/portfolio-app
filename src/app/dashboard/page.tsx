"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const router = useRouter();

  interface User {
    _id: string;
    fullName: string;
    email: string;
    occupation: string;
    role: string;
    slug: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/profiles`, {
          method: "GET",
          credentials: "include", // ✅ Ensures cookies (JWT) are sent
        });

        if (response.status === 401) {
          router.push("/404"); // 🔒 Redirect if user is not authenticated
          return;
        }

        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();
        setUsers(data);
      } catch (err: any) {
        console.error("Error fetching users:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [router]);

  if (loading)
    return <p className="text-center text-gray-500">Loading users...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen p-8 sm:p-16 font-sans">
      <h1 className="text-4xl font-bold mb-6 text-center">User List</h1>

      {users.length > 0 ? (
        <ul className="max-w-2xl mx-auto border border-gray-300 rounded-lg overflow-hidden shadow-lg">
          {users.map((user) => (
            <li
              key={user._id}
              className="p-4 border-b border-gray-200 hover:bg-gray-100 transition-all"
            >
              <div>
                <Link
                  href={`/user/${user._id}`}
                  className="text-blue-600 hover:underline"
                >
                  <span className="font-semibold">{user.fullName}</span> -{" "}
                  {user.occupation}
                </Link>
                {" ("}
                <Link
                  href={`/${user.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  Webpage
                </Link>
                {")"}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">No users found.</p>
      )}
    </div>
  );
}
