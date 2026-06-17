"use client";

import { useEffect, useState } from "react";

type District = {
  id: number;
  name: string;
};

type Taluka = {
  id: number;
  name: string;
};

export default function SearchForm() {
  const [districts, setDistricts] = useState<District[]>([]);
  const [districtId, setDistrictId] = useState("");

  const [talukas, setTalukas] = useState<Taluka[]>([]);
  const [talukaId, setTalukaId] = useState("");

  const [surveyNo, setSurveyNo] = useState("");
  const [loadingTalukas, setLoadingTalukas] = useState(false);

  // Load Districts
  useEffect(() => {
    async function loadDistricts() {
      try {
        const response = await fetch("/api/districts");

        if (!response.ok) {
          throw new Error("Failed to load districts");
        }

        const data: District[] = await response.json();

        setDistricts(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadDistricts();
  }, []);

  // Load Talukas when District changes
  useEffect(() => {
    async function loadTalukas() {
      if (!districtId) {
        setTalukas([]);
        setTalukaId("");
        return;
      }

      try {
        setLoadingTalukas(true);

        const response = await fetch(
          `/api/talukas?districtId=${districtId}`
        );

        if (!response.ok) {
          throw new Error("Failed to load talukas");
        }

        const data: Taluka[] = await response.json();

        console.log("Talukas:", data);

        setTalukas(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingTalukas(false);
      }
    }

    loadTalukas();
  }, [districtId]);

  const handleSearch = () => {
    console.log({
      districtId,
      talukaId,
      surveyNo,
    });
  };

  return (
    <div className="mt-12 mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-md">
      <h3 className="mb-6 text-2xl font-semibold">
        Search Land Records
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* District */}
        <select
          className="rounded-lg border p-3"
          value={districtId}
          onChange={(e) => setDistrictId(e.target.value)}
        >
          <option value="">
            Select District
          </option>

          {districts.map((district) => (
            <option
              key={district.id}
              value={district.id}
            >
              {district.name}
            </option>
          ))}
        </select>

        {/* Taluka */}
        <select
          className="rounded-lg border p-3"
          value={talukaId}
          onChange={(e) => setTalukaId(e.target.value)}
          disabled={!districtId || loadingTalukas}
        >
          <option value="">
            {loadingTalukas
              ? "Loading Talukas..."
              : "Select Taluka"}
          </option>

          {talukas.map((taluka) => (
            <option
              key={taluka.id}
              value={taluka.id}
            >
              {taluka.name}
            </option>
          ))}
        </select>

        {/* Village Placeholder */}
        <select
          className="rounded-lg border p-3"
          disabled
        >
          <option>
            Select Village
          </option>
        </select>

        {/* Survey Number */}
        <input
          type="text"
          placeholder="Enter Survey Number"
          className="rounded-lg border p-3"
          value={surveyNo}
          onChange={(e) => setSurveyNo(e.target.value)}
        />
      </div>

      {/* Debug */}
      <div className="mt-4 text-sm text-gray-500">
        District ID: {districtId || "None"} |
        Talukas Loaded: {talukas.length}
      </div>

      <button
        onClick={handleSearch}
        className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
}