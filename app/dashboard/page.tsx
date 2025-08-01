"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [name, setName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("You are not logged in.");
      return;
    }

    fetch("http://localhost:8000/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to fetch user.");
        setName(data.name || data.username || "Unknown");
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (!name) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4 text-xl font-semibold">
      Welcome, {name}!
    </div>
  );
}
