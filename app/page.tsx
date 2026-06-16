export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="container mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-center text-gray-900">
          Land Record Portal
        </h1>

        <p className="mt-4 text-center text-lg text-gray-600">
          Digital platform for searching and managing land records.
        </p>

        <div className="mt-12 max-w-3xl mx-auto rounded-xl bg-white p-8 shadow-md">
          <h2 className="text-2xl font-semibold mb-6">
            Search Land Records
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select className="border rounded-lg p-3">
              <option>Select District</option>
            </select>

            <select className="border rounded-lg p-3">
              <option>Select Taluka</option>
            </select>

            <select className="border rounded-lg p-3">
              <option>Select Village</option>
            </select>

            <input
              type="text"
              placeholder="Enter Survey Number"
              className="border rounded-lg p-3"
            />
          </div>

          <button className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 transition">
            Search
          </button>
        </div>
      </section>
    </main>
  );
}