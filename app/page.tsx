import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchForm from "@/components/home/SearchForm";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <section className="container mx-auto px-4 py-20 md:py-28">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-sky-100/50 dark:bg-sky-900/30 border border-sky-200 dark:border-sky-800">
              <span className="text-xs font-semibold text-sky-700 dark:text-sky-400">✨ Digital Government Service</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              Land Record
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-teal-600 dark:from-sky-400 dark:to-teal-400">
                Portal
              </span>
            </h2>

            <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Search, retrieve, and manage digital land records with ease. Fast, secure, and transparent access to all your land information in one place.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center justify-center gap-2 text-slate-700 dark:text-slate-300">
                <span>⚡</span>
                <span className="text-sm font-medium">Instant Search</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-700 dark:text-slate-300">
                <span>🔒</span>
                <span className="text-sm font-medium">Secure & Verified</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-700 dark:text-slate-300">
                <span>📱</span>
                <span className="text-sm font-medium">Mobile Friendly</span>
              </div>
            </div>
          </div>

          <SearchForm />
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Why Choose Us?</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">📋</div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Complete Records</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Access comprehensive digital copies of all your land records in one place.</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">⚡</div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Fast Retrieval</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Get results instantly with our optimized search and retrieval system.</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">🛡️</div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Secure & Private</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Your data is protected with enterprise-grade security and encryption.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}