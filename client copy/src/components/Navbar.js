import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import SearchBar from './SearchBar';
import FilterMenu from './FilterMenu';

export default function Navbar({ onSearch }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation(); 

  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-black border-b border-gray-800 w-full z-50">
      <div className="max-w-screen-xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between">
        <Link to="/home" className="text-green-500 font-extrabold text-3xl tracking-wide">
          GreenFlix
        </Link>

        <div className="flex items-center gap-6 md:gap-8 md:order-2">
          <div className="flex items-center gap-4">
            <SearchBar onSearch={onSearch} />
            <FilterMenu />
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleUserMenu}
              type="button"
              className="flex items-center justify-center w-11 h-11 bg-gray-800 rounded-full focus:ring-4 focus:ring-green-600"
              aria-expanded={userMenuOpen}
              aria-haspopup="true"
              aria-label="User menu"
            >
              <img
                className="w-full h-full rounded-full object-cover"
                src="/profilepic.jpg"
                alt="User profile"
              />
            </button>

            {userMenuOpen && (
              <div
                className="absolute right-0 mt-3 w-48 bg-gray-900 rounded-md shadow-lg z-50 border border-gray-700"
                role="menu"
                aria-orientation="vertical"
              >
                <div className="px-4 py-3 text-green-600">
                  <p className="text-base font-semibold">User</p>
                  <p className="text-xs text-gray-400 truncate">user@example.com</p>
                </div>
                <ul className="divide-y divide-gray-700">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-green-500 hover:bg-gray-700"
                      role="menuitem"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-red-600 hover:bg-gray-700"
                      role="menuitem"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <button
            type="button"
            className="inline-flex items-center p-2 ml-2 text-gray-400 rounded-md md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-7 h-7 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div
          className={`${
            mobileMenuOpen ? 'block' : 'hidden'
          } w-full md:flex md:w-auto md:order-1 mt-4 md:mt-0`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-12 font-semibold text-xl md:text-lg bg-gray-900 md:bg-black rounded-lg md:rounded-none border border-gray-800 md:border-0 p-6 md:p-0">
            <li>
              <Link
                to="/home"
                className={`block py-3 px-6 rounded-md transition-colors ${
                  isActive('/home') ? 'text-green-500 bg-gray-800' : 'text-gray-400 hover:text-green-500'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/mylist"
                className={`block py-3 px-6 rounded-md transition-colors ${
                  isActive('/mylist') ? 'text-green-500 bg-gray-800' : 'text-gray-400 hover:text-green-500'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                My List
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
