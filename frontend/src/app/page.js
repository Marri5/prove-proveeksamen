"use client";

import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Søker etter:", search);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Reinsdyrregister</h1>
      <form onSubmit={handleSearch} className="w-full max-w-md">
        <input
          type="text"
          className="w-full p-3 border rounded-lg"
          placeholder="Søk etter reinsdyr..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Søk
        </button>
      </form>
    </div>
  );
}
