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

type Owner = {
  id: number;
  name: string;
};

export default function CreateLandRecordPage() {
  const router = useRouter();

  const [districts, setDistricts] =
    useState<District[]>([]);

  const [talukas, setTalukas] =
    useState<Taluka[]>([]);

  const [villages, setVillages] =
    useState<Village[]>([]);

  const [owners, setOwners] =
    useState<Owner[]>([]);

  const [form, setForm] = useState({
    surveyNumber: "",
    khataNumber: "",
    mutationNumber: "",

    area: "",

    landType: "",
    irrigationType: "",
    cropType: "",

    districtId: "",
    talukaId: "",
    villageId: "",

    ownerId: "",
  });

  useEffect(() => {
    async function loadInitialOptions() {
      const [districtResponse, ownerResponse] = await Promise.all([
        fetch("/api/districts"),
        fetch("/api/admin/owners"),
      ]);

      if (districtResponse.ok) {
        setDistricts(await districtResponse.json());
      }

      if (ownerResponse.ok) {
        setOwners(await ownerResponse.json());
      }
    }

    void loadInitialOptions();
  }, []);

  useEffect(() => {
    if (!form.districtId) return;

    async function loadTalukas() {
      const response = await fetch(
        `/api/talukas?districtId=${form.districtId}`
      );

      if (response.ok) {
        setTalukas(await response.json());
      }
    }

    loadTalukas();
  }, [form.districtId]);

  useEffect(() => {
    if (!form.talukaId) return;

    async function loadVillages() {
      const response = await fetch(
        `/api/villages?talukaId=${form.talukaId}`
      );

      if (response.ok) {
        setVillages(await response.json());
      }
    }

    loadVillages();
  }, [form.talukaId]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (
      !form.surveyNumber.trim() ||
      !form.area ||
      !form.districtId ||
      !form.talukaId ||
      !form.villageId ||
      !form.ownerId
    ) {
      alert("Please fill all required fields");
      return;
    }

    const owner = owners.find(({ id }) => String(id) === form.ownerId);

    const response = await fetch(
      "/api/admin/land-records/create",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          ...form,
          ownerName: owner?.name ?? "",
        }),
      }
    );

    if (response.ok) {
      router.push(
        "/admin/land-records"
      );
    }
  }

  return (
    <div className="mx-auto max-w-5xl p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Create Land Record
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <input
          placeholder="Survey Number"
          required
          className="rounded border p-3"
          value={form.surveyNumber}
          onChange={(e) =>
            setForm({
              ...form,
              surveyNumber:
                e.target.value,
            })
          }
        />

        <select
          required
          className="rounded border p-3"
          value={form.districtId}
          onChange={(e) => {
            setTalukas([]);
            setVillages([]);
            setForm({
              ...form,
              districtId: e.target.value,
              talukaId: "",
              villageId: "",
            });
          }}
        >
          <option value="">Select District</option>

          {districts.map((district) => (
            <option
              key={district.id}
              value={district.id}
            >
              {district.name}
            </option>
          ))}
        </select>

        <select
          required
          className="rounded border p-3"
          value={form.talukaId}
          onChange={(e) => {
            setVillages([]);
            setForm({
              ...form,
              talukaId: e.target.value,
              villageId: "",
            });
          }}
        >
          <option value="">Select Taluka</option>

          {talukas.map((taluka) => (
            <option
              key={taluka.id}
              value={taluka.id}
            >
              {taluka.name}
            </option>
          ))}
        </select>

        <select
          required
          className="rounded border p-3"
          value={form.villageId}
          onChange={(e) =>
            setForm({
              ...form,
              villageId: e.target.value,
            })
          }
        >
          <option value="">Select Village</option>

          {villages.map((village) => (
            <option
              key={village.id}
              value={village.id}
            >
              {village.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Khata Number"
          className="rounded border p-3"
          value={form.khataNumber}
          onChange={(e) =>
            setForm({
              ...form,
              khataNumber:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Mutation Number"
          className="rounded border p-3"
          value={form.mutationNumber}
          onChange={(e) =>
            setForm({
              ...form,
              mutationNumber: e.target.value,
            })
          }
        />

        <select
          required
          className="rounded border p-3"
          value={form.ownerId}
          onChange={(e) =>
            setForm({
              ...form,
              ownerId: e.target.value,
            })
          }
        >
          <option value="">Select Owner</option>

          {owners.map((owner) => (
            <option
              key={owner.id}
              value={owner.id}
            >
              {owner.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Area"
          type="number"
          required
          min="0"
          step="any"
          className="rounded border p-3"
          value={form.area}
          onChange={(e) =>
            setForm({
              ...form,
              area: e.target.value,
            })
          }
        />

        <select
          className="rounded border p-3"
          value={form.landType}
          onChange={(e) =>
            setForm({
              ...form,
              landType: e.target.value,
            })
          }
        >
          <option value="">Select Land Type</option>
          <option value="Agricultural">Agricultural</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
        </select>

        <select
          className="rounded border p-3"
          value={form.irrigationType}
          onChange={(e) =>
            setForm({
              ...form,
              irrigationType: e.target.value,
            })
          }
        >
          <option value="">Select Irrigation Type</option>
          <option value="Drip Irrigation">Drip Irrigation</option>
          <option value="Canal">Canal</option>
          <option value="Well">Well</option>
          <option value="Rainfed">Rainfed</option>
        </select>

        <input
          placeholder="Crop Type"
          className="rounded border p-3"
          value={form.cropType}
          onChange={(e) =>
            setForm({
              ...form,
              cropType: e.target.value,
            })
          }
        />

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full rounded bg-blue-600 p-3 text-white hover:bg-blue-700"
          >
            Save Land Record
          </button>
        </div>
      </form>
    </div>
  );
}
