"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://back-production-ea87.up.railway.app";
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file.");
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      const res = await fetch(`${API_URL}/api/profiles/upload-resume`, {
        method: "POST",
        credentials: "include", // ✅ Sends HTTP-only cookies
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      // ✅ Redirect to the user profile page
      router.push(`/${data.slug}`);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-md p-8 space-y-6 rounded-lg">
        <h2 className="text-2xl font-bold text-center text-[var(--foreground)]">Upload Resume</h2>

        {/* File Upload */}
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="w-full border p-2 rounded-md bg-[var(--background)] text-[var(--foreground)]"
        />

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full px-4 py-2 text-white bg-[var(--primary)] rounded-md transition duration-300 hover:bg-[var(--highlight)]"
        >
          {uploading ? "Uploading..." : "Upload Resume"}
        </button>

        {/* Error Message */}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
}
