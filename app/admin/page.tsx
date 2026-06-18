"use client";

import { useEffect, useState } from "react";

type DashboardData = {
  landRecords: number;
  owners: number;
  mutations: number;
  districts: number;
  talukas: number;
  villages: number;
};

export default function AdminPage() {
  const [data, setData] =
    useState<DashboardData | null>(null);

  useEffect(() => {
    async function loadData() {
      const response = await fetch(
        "/api/admin/dashboard"
      );

      const result = await response.json();

      setData(result);
    }

    loadData();
  }, []);

  if (!data) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

        <DashboardCard
          title="Land Records"
          value={data.landRecords}
        />

        <DashboardCard
          title="Owners"
          value={data.owners}
        />

        <DashboardCard
          title="Mutations"
          value={data.mutations}
        />

        <DashboardCard
          title="Districts"
          value={data.districts}
        />

        <DashboardCard
          title="Talukas"
          value={data.talukas}
        />

        <DashboardCard
          title="Villages"
          value={data.villages}
        />

      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow">
      <h2 className="text-lg font-semibold">
        {title}
      </h2>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}