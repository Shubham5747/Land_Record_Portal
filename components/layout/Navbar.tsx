export default function Navbar() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-700">
            Land Record Portal
          </h1>
          <p className="text-sm text-gray-500">
            Digital Land Information System
          </p>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#" className="hover:text-blue-600">
            Home
          </a>
          <a href="#" className="hover:text-blue-600">
            Search Records
          </a>
          <a href="#" className="hover:text-blue-600">
            About
          </a>
          <a href="#" className="hover:text-blue-600">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}