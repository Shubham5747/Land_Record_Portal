"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";

type LandRecord = {
  id: number;
  surveyNumber: string;
  ownerName: string;
  area: number;

  district: {
    name: string;
  };

  taluka: {
    name: string;
  };

  village: {
    name: string;
  };
};

function SearchResults() {
  const searchParams = useSearchParams();

  const [records, setRecords] = useState<LandRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRecords() {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/land-records/search?${searchParams.toString()}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch records");
        }

        const data = await response.json();

        setRecords(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load records");
      } finally {
        setLoading(false);
      }
    }

    loadRecords();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-lg font-medium">
          Loading land records...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto mt-10 max-w-4xl rounded-lg border border-red-300 bg-red-50 p-6 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Land Record Search Results
        </h1>

        <p className="mt-2 text-gray-600">
          Total Records Found:{" "}
          <span className="font-semibold">
            {records.length}
          </span>
        </p>
      </div>

      {/* Search Summary */}
      <div className="mb-6 rounded-lg border bg-gray-50 p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div>
            <p className="text-sm text-gray-500">
              District ID
            </p>
            <p>{searchParams.get("districtId")}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Taluka ID
            </p>
            <p>{searchParams.get("talukaId")}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Village ID
            </p>
            <p>{searchParams.get("villageId")}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Survey Number
            </p>
            <p>{searchParams.get("surveyNo") || "-"}</p>
          </div>
        </div>
      </div>

      {records.length === 0 ? (
        <div className="rounded-lg border p-10 text-center">
          No land records found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-left">
                  Survey No
                </th>

                <th className="border p-3 text-left">
                  Owner Name
                </th>

                <th className="border p-3 text-left">
                  Area
                </th>

                <th className="border p-3 text-left">
                  District
                </th>

                <th className="border p-3 text-left">
                  Taluka
                </th>

                <th className="border p-3 text-left">
                  Village
                </th>

                <th className="border p-3 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {records.map((record) => (
                <tr
                  key={record.id}
                  className="hover:bg-gray-50"
                >
                  <td className="border p-3">
                    {record.surveyNumber}
                  </td>

                  <td className="border p-3">
                    {record.ownerName}
                  </td>

                  <td className="border p-3">
                    {record.area}
                  </td>

                  <td className="border p-3">
                    {record.district.name}
                  </td>

                  <td className="border p-3">
                    {record.taluka.name}
                  </td>

                  <td className="border p-3">
                    {record.village.name}
                  </td>

                  <td className="border p-3 text-center">
                    <div className="flex justify-center gap-2">
                    <Link
                        href={`/land-record/${record.id}`}
                        className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
                    >
                        View 7/12
                    </Link>

                      <button
                        className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                      >
                        Print
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[400px] items-center justify-center text-lg font-medium">
          Loading land records...
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
