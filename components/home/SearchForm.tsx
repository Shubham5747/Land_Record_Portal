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
  const [error, setError] = useState<string | null>(null);

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
        setError("Unable to load districts. Please try again later.");
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
        setError("Unable to load talukas. Please try again.");
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
        setError("Unable to load villages. Please try again.");
      } finally {
        setLoadingVillages(false);
      }
    }

    loadVillages();
  }, [talukaId]);

  const handleSearch = () => {
    setError(null);
    
    if (!districtId) {
      setError("Please select a District");
      return;
    }

    if (!talukaId) {
      setError("Please select a Taluka");
      return;
    }

    if (!villageId) {
      setError("Please select a Village");
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mx-auto mt-16 max-w-4xl px-4">
      <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 p-8 shadow-lg dark:bg-slate-900/80 dark:border-slate-800">
        <div className="mb-8">
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            Search Land Records
          </h3>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Find land information by district, taluka, village, and survey number.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800">
            <p className="text-sm font-medium text-red-800 dark:text-red-400 flex items-center gap-2">
              <span>⚠️</span>
              {error}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* District */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              District <span className="text-red-500">*</span>
            </label>
            <select
              className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent dark:border-slate-600 dark:bg-slate-800 dark:text-white disabled:opacity-60 disabled:cursor-not-allowed"
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
          </div>

          {/* Taluka */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Taluka <span className="text-red-500">*</span>
            </label>
            <select
              className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent dark:border-slate-600 dark:bg-slate-800 dark:text-white disabled:opacity-60 disabled:cursor-not-allowed"
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
          </div>

          {/* Village */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Village <span className="text-red-500">*</span>
            </label>
            <select
              className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent dark:border-slate-600 dark:bg-slate-800 dark:text-white disabled:opacity-60 disabled:cursor-not-allowed"
              value={villageId}
              onChange={(e) => setVillageId(e.target.value)}
              disabled={!talukaId || loadingVillages}
              onKeyPress={handleKeyPress}
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
          </div>

          {/* Survey Number */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Survey Number <span className="text-slate-400">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g., 123, 456-A"
              className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
              value={surveyNo}
              onChange={(e) => setSurveyNo(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="mt-8 w-full rounded-lg bg-sky-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-sky-700 transition-all duration-200 flex items-center justify-center gap-2 dark:bg-sky-700 dark:hover:bg-sky-800 active:scale-95"
        >
          <span>🔍</span>
          Search Records
        </button>

        <p className="mt-4 text-xs text-center text-slate-500 dark:text-slate-400">
          All fields marked with <span className="text-red-500">*</span> are required
        </p>
      </div>
    </div>
  );
}
