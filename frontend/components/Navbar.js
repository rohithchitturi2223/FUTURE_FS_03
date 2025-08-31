// components/Navbar.jsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-red-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-3xl font-bold tracking-tight" style={{ fontFamily: "'CocaCola', sans-serif" }}>
                Coca-Cola
              </span>
            </Link>
          </div>
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Home
            </Link>
            <Link href="/products" className="hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Products
            </Link>
            <Link href="/about" className="hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Contact
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-red-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className="md:hidden hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-red-700">
            Home
          </Link>
          <Link href="/products" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-red-700">
            Products
          </Link>
          <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-red-700">
            About
          </Link>
          <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-red-700">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}