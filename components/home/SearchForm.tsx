"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type District = {
  id: number;
  name: string;
};

type Taluka = {
  id: number;
  name: string;
};

type Village = {
  id: number;
  name: string;
};

export default function SearchForm() {
  const router = useRouter();

  const [districts, setDistricts] = useState<District[]>([]);
  const [talukas, setTalukas] = useState<Taluka[]>([]);
  const [villages, setVillages] = useState<Village[]>([]);

  const [districtId, setDistrictId] = useState("");
  const [talukaId, setTalukaId] = useState("");
  const [villageId, setVillageId] = useState("");
  const [surveyNo, setSurveyNo] = useState("");

  const [loadingDistricts, setLoadingDistricts] = useState(true);
  const [loadingTalukas, setLoadingTalukas] = useState(false);
  const [loadingVillages, setLoadingVillages] = useState(false);

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
        console.error("Failed to load districts", error);
      } finally {
        setLoadingDistricts(false);
      }
    }

    loadDistricts();
  }, []);

  // Load Talukas
  useEffect(() => {
    async function loadTalukas() {
      if (!districtId) {
        setTalukas([]);
        setTalukaId("");
        setVillages([]);
        setVillageId("");
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

        setTalukas(data);
        setTalukaId("");
        setVillages([]);
        setVillageId("");
      } catch (error) {
        console.error("Failed to load talukas", error);
      } finally {
        setLoadingTalukas(false);
      }
    }

    loadTalukas();
  }, [districtId]);

  // Load Villages
  useEffect(() => {
    async function loadVillages() {
      if (!talukaId) {
        setVillages([]);
        setVillageId("");
        return;
      }

      try {
        setLoadingVillages(true);

        const response = await fetch(
          `/api/villages?talukaId=${talukaId}`
        );

        if (!response.ok) {
          throw new Error("Failed to load villages");
        }

        const data: Village[] = await response.json();

        setVillages(data);
        setVillageId("");
      } catch (error) {
        console.error("Failed to load villages", error);
      } finally {
        setLoadingVillages(false);
      }
    }

    loadVillages();
  }, [talukaId]);

  const handleSearch = () => {
    if (!districtId) {
      alert("Please select a District");
      return;
    }

    if (!talukaId) {
      alert("Please select a Taluka");
      return;
    }

    if (!villageId) {
      alert("Please select a Village");
      return;
    }

    const params = new URLSearchParams({
      districtId,
      talukaId,
      villageId,
      surveyNo,
    });

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="mx-auto mt-12 max-w-4xl rounded-xl bg-white p-8 shadow-md">
      <h3 className="mb-6 text-2xl font-semibold">
        Search Land Records
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* District */}
        <select
          className="rounded-lg border p-3"
          value={districtId}
          onChange={(e) => setDistrictId(e.target.value)}
          disabled={loadingDistricts}
        >
          <option value="">
            {loadingDistricts
              ? "Loading Districts..."
              : "Select District"}
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

        {/* Village */}
        <select
          className="rounded-lg border p-3"
          value={villageId}
          onChange={(e) => setVillageId(e.target.value)}
          disabled={!talukaId || loadingVillages}
        >
          <option value="">
            {loadingVillages
              ? "Loading Villages..."
              : "Select Village"}
          </option>

          {villages.map((village) => (
            <option
              key={village.id}
              value={village.id}
            >
              {village.name}
            </option>
          ))}
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

      <button
        onClick={handleSearch}
        className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
}
