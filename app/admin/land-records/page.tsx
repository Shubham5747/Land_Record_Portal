"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type LandRecord = {
  id: number;
  surveyNumber: string;
  area: number;

  owner?: {
    name: string;
  };

  village: {
    name: string;
  };
};

export default function LandRecordsPage() {
  const [records, setRecords] = useState<LandRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecords() {
      try {
        const response = await fetch(
          "/api/admin/land-records"
        );

        const data = await response.json();

        setRecords(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadRecords();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Land Records
        </h1>

        <Link
          href="/admin/land-records/create"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Add Record
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left">
                ID
              </th>

              <th className="border p-3 text-left">
                Survey No
              </th>

              <th className="border p-3 text-left">
                Owner
              </th>

              <th className="border p-3 text-left">
                Village
              </th>

              <th className="border p-3 text-left">
                Area
              </th>

              <th className="border p-3 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td className="border p-3">
                  {record.id}
                </td>

                <td className="border p-3">
                  {record.surveyNumber}
                </td>

                <td className="border p-3">
                  {record.owner?.name || "-"}
                </td>

                <td className="border p-3">
                  {record.village.name}
                </td>

                <td className="border p-3">
                  {record.area}
                </td>

                <td className="border p-3">
                  <div className="flex gap-2">

                    <Link
                      href={`/land-record/${record.id}`}
                      className="rounded bg-green-600 px-3 py-1 text-white"
                    >
                      View
                    </Link>

                    <Link
                      href={`/admin/land-records/${record.id}`}
                      className="rounded bg-yellow-500 px-3 py-1 text-white"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={async () => {
                        if (
                          !confirm(
                            "Delete this record?"
                          )
                        )
                          return;

                        await fetch(
                          `/api/admin/land-records/${record.id}`,
                          {
                            method: "DELETE",
                          }
                        );

                        window.location.reload();
                      }}
                      className="rounded bg-red-600 px-3 py-1 text-white"
                    >
                      Delete
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {records.length === 0 && (
          <div className="p-8 text-center">
            No records found
          </div>
        )}
      </div>
    </div>
  );
}