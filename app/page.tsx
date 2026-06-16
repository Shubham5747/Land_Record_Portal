import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        <section className="container mx-auto px-6 py-16">
          <h2 className="text-5xl font-bold text-center text-gray-900">
            Land Record Portal
          </h2>

          <p className="mt-4 text-center text-lg text-gray-600">
            Search and manage digital land records with ease.
          </p>

          <div className="mt-12 max-w-3xl mx-auto rounded-xl bg-white p-8 shadow-md">
            <h3 className="mb-6 text-2xl font-semibold">
              Search Land Records
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <select className="rounded-lg border p-3">
                <option>Select District</option>
              </select>

              <select className="rounded-lg border p-3">
                <option>Select Taluka</option>
              </select>

              <select className="rounded-lg border p-3">
                <option>Select Village</option>
              </select>

              <input
                type="text"
                placeholder="Enter Survey Number"
                className="rounded-lg border p-3"
              />
            </div>

            <button className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700">
              Search
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}