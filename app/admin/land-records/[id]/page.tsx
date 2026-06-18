"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditLandRecordPage() {
  const params = useParams();
  const router = useRouter();

  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    async function loadRecord() {
      const response = await fetch(
        `/api/admin/land-records/${params.id}`
      );

      const data = await response.json();

      setForm(data);
    }

    loadRecord();
  }, [params.id]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await fetch(
      `/api/admin/land-records/${params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    router.push(
      "/admin/land-records"
    );
  }

  if (!form) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Edit Land Record
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4"
      >
        <input
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

        <input
          className="rounded border p-3"
          value={form.khataNumber || ""}
          onChange={(e) =>
            setForm({
              ...form,
              khataNumber:
                e.target.value,
            })
          }
        />

        <input
          className="rounded border p-3"
          value={form.area}
          onChange={(e) =>
            setForm({
              ...form,
              area: e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="rounded bg-blue-600 p-3 text-white"
        >
          Update Record
        </button>
      </form>
    </div>
  );
}