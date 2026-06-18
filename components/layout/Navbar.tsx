export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-sky-700 dark:text-sky-400">
            Land Record
          </h1>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Digital Land Information System
          </p>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="/" className="text-sm font-medium text-slate-700 hover:text-sky-700 transition-colors dark:text-slate-300 dark:hover:text-sky-400">
            Home
          </a>
          <a href="/search" className="text-sm font-medium text-slate-700 hover:text-sky-700 transition-colors dark:text-slate-300 dark:hover:text-sky-400">
            Search Records
          </a>
          <a href="#about" className="text-sm font-medium text-slate-700 hover:text-sky-700 transition-colors dark:text-slate-300 dark:hover:text-sky-400">
            About
          </a>
          <a href="#contact" className="text-sm font-medium text-slate-700 hover:text-sky-700 transition-colors dark:text-slate-300 dark:hover:text-sky-400">
            Contact
          </a>
        </nav>

        <button className="md:hidden p-2 text-slate-700 dark:text-slate-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}