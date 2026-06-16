export default function Footer() {
  return (
    <footer className="border-t bg-white mt-16">
      <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Land Record Portal. All rights reserved.
      </div>
    </footer>
  );
}