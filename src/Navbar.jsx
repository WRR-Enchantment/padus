// Navbar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="fixed top-[80px] left-2 z-50">
      {/* Tombol Menu */}
      <button
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle menu"
        className="p-2 rounded-md bg-white/90 text-black shadow-lg hover:bg-white/95 transition"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          {menuOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mt-2 w-48 bg-white/90 text-black rounded-lg shadow-lg backdrop-blur-md border border-white/50"
          >
            <ul>
              <li>
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className={`block w-full text-left px-4 py-2 hover:bg-yellow-300 transition ${
                    location.pathname === "/" ? "bg-yellow-200 font-semibold" : ""
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/rekrutmen"
                  onClick={() => setMenuOpen(false)}
                  className={`block w-full text-left px-4 py-2 hover:bg-yellow-300 transition ${
                    location.pathname === "/rekrutmen" ? "bg-yellow-200 font-semibold" : ""
                  }`}
                >
                  Pendaftaran
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
