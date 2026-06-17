import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchForm from "@/components/home/SearchForm";

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

          <SearchForm />
        </section>
      </main>

      <Footer />
    </>
  );
}