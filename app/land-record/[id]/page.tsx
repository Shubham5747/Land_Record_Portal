"use client";

import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";

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

  pdf.setFontSize(18);
  pdf.text("MAHARASHTRA LAND RECORD PORTAL", 20, 20);

  pdf.setFontSize(14);
  pdf.text("7/12 EXTRACT", 20, 30);

  pdf.setFontSize(11);

  pdf.text(`Survey Number: ${record.surveyNumber}`, 20, 50);
  pdf.text(`Khata Number: ${record.khataNumber || "-"}`, 20, 60);
  pdf.text(`Owner Name: ${record.ownerName}`, 20, 70);
  pdf.text(`Mutation Number: ${record.mutationNumber || "-"}`, 20, 80);

  pdf.text(`District: ${record.district.name}`, 20, 100);
  pdf.text(`Taluka: ${record.taluka.name}`, 20, 110);
  pdf.text(`Village: ${record.village.name}`, 20, 120);

  pdf.text(`Area: ${record.area} Acres`, 20, 140);
  pdf.text(`Land Type: ${record.landType || "-"}`, 20, 150);
  pdf.text(
    `Irrigation Type: ${record.irrigationType || "-"}`,
    20,
    160
  );
  pdf.text(`Crop Type: ${record.cropType || "-"}`, 20, 170);

  pdf.text(
    `Generated On: ${new Date().toLocaleDateString()}`,
    20,
    190
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

        {/* Record Information */}
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

        {/* Footer */}
        <div className="mt-10 border-t pt-4 text-center text-sm text-gray-500">
          This is a digitally generated land record
          for demonstration purposes.
        </div>
      </div>
    </div>
  );
}

