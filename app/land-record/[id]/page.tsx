"use client";

import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type LandRecord = {
  id: number;

  surveyNumber: string;
  ownerName: string;
  area: number;

  khataNumber?: string;
  mutationNumber?: string;

  landType?: string;
  irrigationType?: string;
  cropType?: string;

  createdAt?: string;

  district: {
    name: string;
  };

  taluka: {
    name: string;
  };

  village: {
    name: string;
  };

  owner: {
    id: number;
    name: string;
    mobile?: string;
    address?: string;
  };

  mutations: {
    id: number;
    mutationNumber: string;
    mutationDate: string;
    remarks?: string;
  }[];
};

export default function LandRecordPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [record, setRecord] =
    useState<LandRecord | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecord() {
      try {
        const { id } = await params;

        const response = await fetch(
          `/api/land-records/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch record");
        }

        const data = await response.json();

        setRecord(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadRecord();
  }, [params]);

  const downloadPDF = () => {
    if (!record) return;

    const pdf = new jsPDF();

    // Header
    pdf.setFontSize(18);
    pdf.text("MAHARASHTRA LAND RECORD PORTAL", 105, 15, {
      align: "center",
    });

    pdf.setFontSize(14);
    pdf.text("7/12 EXTRACT", 105, 25, {
      align: "center",
    });

    // Land Details
    autoTable(pdf, {
      startY: 35,
      head: [["Field", "Value"]],
      body: [
        ["Survey Number", record.surveyNumber],
        ["Khata Number", record.khataNumber || "-"],
        ["Owner Name", record.ownerName],
        ["Mutation Number", record.mutationNumber || "-"],
        ["District", record.district.name],
        ["Taluka", record.taluka.name],
        ["Village", record.village.name],
        ["Area", `${record.area.toFixed(2)} Acres`],
        ["Land Type", record.landType || "-"],
        ["Irrigation Type", record.irrigationType || "-"],
        ["Crop Type", record.cropType || "-"],
      ],
    });

    // Owner Details
    const ownerY = (pdf as any).lastAutoTable.finalY + 10;

    pdf.setFontSize(13);
    pdf.text("Owner Details", 14, ownerY);

    autoTable(pdf, {
      startY: ownerY + 5,
      head: [["Field", "Value"]],
      body: [
        ["Owner Name", record.owner.name],
        ["Mobile", record.owner.mobile || "-"],
        ["Address", record.owner.address || "-"],
      ],
    });

    // Mutation History
    const mutationY = (pdf as any).lastAutoTable.finalY + 10;

    pdf.setFontSize(13);
    pdf.text("Mutation History", 14, mutationY);

    autoTable(pdf, {
      startY: mutationY + 5,
      head: [["Mutation No", "Date", "Remarks"]],
      body: record.mutations.map((mutation) => [
        mutation.mutationNumber,
        new Date(mutation.mutationDate).toLocaleDateString(),
        mutation.remarks || "-",
      ]),
    });

    const footerY = (pdf as any).lastAutoTable.finalY + 15;

    pdf.setFontSize(10);

    pdf.text(
      `Generated On: ${new Date().toLocaleDateString()}`,
      14,
      footerY
    );

    pdf.text(
      `Record ID: ${record.id}`,
      14,
      footerY + 8
    );

    pdf.save(`7-12-${record.surveyNumber}.pdf`);
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-lg">
        Loading land record...
      </div>
    );
  }

  if (!record) {
    return (
      <div className="p-10 text-center text-red-500">
        Record Not Found
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6">

      {/* Action Buttons */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => window.print()}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Print 7/12
        </button>

        <button
          onClick={downloadPDF}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Download PDF
        </button>
      </div>

      {/* PDF Content */}
      <div
        className="rounded-lg border bg-white p-8 shadow"
      >        
        {/* Header */}
        <div className="mb-8 border-b pb-4 text-center">
          <h1 className="text-3xl font-bold">
            Maharashtra Land Record Portal
          </h1>

          <h2 className="mt-2 text-xl font-semibold">
            7/12 Extract
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Digitally Generated Land Record
          </p>
        </div>

        {/* Land Details */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <div>
            <p className="text-sm text-gray-500">
              Survey Number
            </p>
            <p className="font-semibold">
              {record.surveyNumber}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Khata Number
            </p>
            <p className="font-semibold">
              {record.khataNumber || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Owner Name
            </p>
            <p className="font-semibold">
              {record.ownerName}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Mutation Number
            </p>
            <p className="font-semibold">
              {record.mutationNumber || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              District
            </p>
            <p className="font-semibold">
              {record.district.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Taluka
            </p>
            <p className="font-semibold">
              {record.taluka.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Village
            </p>
            <p className="font-semibold">
              {record.village.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Area
            </p>
            <p className="font-semibold">
              {record.area.toFixed(2)} Acres
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Land Type
            </p>
            <p className="font-semibold">
              {record.landType || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Irrigation Type
            </p>
            <p className="font-semibold">
              {record.irrigationType || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Crop Type
            </p>
            <p className="font-semibold">
              {record.cropType || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Generated Date
            </p>
            <p className="font-semibold">
              {new Date().toLocaleDateString()}
            </p>
          </div>

        </div>

        {/* Owner Details */}
        <div className="mt-10 border-t pt-6">
          <h2 className="mb-4 text-xl font-semibold">
            Owner Details
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <div>
              <p className="text-sm text-gray-500">
                Owner Name
              </p>
              <p className="font-semibold">
                {record.owner.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Mobile
              </p>
              <p className="font-semibold">
                {record.owner.mobile || "-"}
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">
                Address
              </p>
              <p className="font-semibold">
                {record.owner.address || "-"}
              </p>
            </div>

          </div>
        </div>

        {/* Mutation History */}
        <div className="mt-10 border-t pt-6">
          <h2 className="mb-4 text-xl font-semibold">
            Mutation History
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">
                    Mutation No
                  </th>

                  <th className="border p-3 text-left">
                    Date
                  </th>

                  <th className="border p-3 text-left">
                    Remarks
                  </th>
                </tr>
              </thead>

              <tbody>
                {record.mutations.map((mutation) => (
                  <tr key={mutation.id}>
                    <td className="border p-3">
                      {mutation.mutationNumber}
                    </td>

                    <td className="border p-3">
                      {new Date(
                        mutation.mutationDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="border p-3">
                      {mutation.remarks || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 border-t pt-4 text-center text-sm text-gray-500">
          This is a digitally generated land record for demonstration purposes.
        </div>      
      </div>
    </div>
  );
}

