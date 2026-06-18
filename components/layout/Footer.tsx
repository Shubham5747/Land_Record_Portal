export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Product</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#" className="hover:text-sky-700 dark:hover:text-sky-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-sky-700 dark:hover:text-sky-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-sky-700 dark:hover:text-sky-400 transition-colors">Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#" className="hover:text-sky-700 dark:hover:text-sky-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-sky-700 dark:hover:text-sky-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-sky-700 dark:hover:text-sky-400 transition-colors">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#" className="hover:text-sky-700 dark:hover:text-sky-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-sky-700 dark:hover:text-sky-400 transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-sky-700 dark:hover:text-sky-400 transition-colors">License</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>Email: info@landrecords.gov</li>
              <li>Phone: +91 (0) XXX-XXX-XXXX</li>
              <li>Address: Land Records Office</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-xs text-slate-600 dark:text-slate-400">
            <p>© {currentYear} Land Record Portal. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-sky-700 dark:hover:text-sky-400 transition-colors">Twitter</a>
              <a href="#" className="hover:text-sky-700 dark:hover:text-sky-400 transition-colors">Facebook</a>
              <a href="#" className="hover:text-sky-700 dark:hover:text-sky-400 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}