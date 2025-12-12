import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Sun,
  Moon,
  User,
  LogOut,
  Settings,
  Plus,
} from "lucide-react";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Detect system dark mode
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      const isDark = e.matches;
      setIsDarkMode(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    };

    handleChange({ matches: mediaQuery.matches });
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
  };

  const user = { name: "Ram Kumar", email: "ram@example.com" };

  return (
    <>
      {/* Desktop & Mobile Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-800/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl group-hover:scale-110 transition">
              B
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              BookHub
            </span>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-12">
            <div className="relative w-full group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 group-focus-within:text-purple-600 transition" />
              <input
                type="text"
                placeholder="Search books, authors, ISBN..."
                className="w-full pl-14 pr-6 py-4 rounded-full bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-lg"
              />
              <kbd className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-gray-500 hidden xl:block">
                Ctrl+K
              </kbd>
            </div>
          </div>

          {/* Desktop Right Section */}
          <div className="flex items-center gap-6">
            {/* Add Book Button - Floating & Gorgeous */}
            <Link
              to="/add-book"
              className="group relative hidden md:flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-pink-500/50 transform hover:scale-110 transition-all duration-300 hover:-translate-y-1"
            >
              <Plus className="w-7 h-7 group-hover:rotate-90 transition-transform duration-500 dark:text-white" />
              <span className="dark:text-white">Add Book</span>
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-4 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition group"
            >
              <ShoppingCart className="w-7 h-7 text-gray-700 dark:text-gray-300 group-hover:text-purple-600 transition" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                3
              </span>
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="cursor-pointer p-4 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition group"
            >
              {isDarkMode ? (
                <Sun className="w-7 h-7 text-yellow-500 group-hover:rotate-180 transition duration-500" />
              ) : (
                <Moon className="w-7 h-7 text-gray-700 group-hover:rotate-180 transition duration-500" />
              )}
            </button>

            {/* User Profile */}
            <div ref={profileRef} className="relative hidden lg:block">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="cursor-pointer flex items-center gap-4 p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl">
                  {user.name.charAt(0)}
                </div>
              </button>

              {/* Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-4 w-72 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fadeIn">
                  <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full rounded-full flex items-center justify-center text-3xl font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xl font-bold">{user.name}</p>
                        <p className="text-sm opacity-90">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      <User className="w-6 h-6" />
                      <span className="font-medium">My Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      <Settings className="w-6 h-6" />
                      <span className="font-medium">Settings</span>
                    </Link>
                    <hr className="border-gray-200 dark:border-gray-700" />
                    <button className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 w-full transition">
                      <LogOut className="w-6 h-6" />
                      <span className="font-medium">Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-4 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-85 bg-white dark:bg-gray-900 shadow-2xl animate-slideIn p-8">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Menu
              </h3>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* Mobile Add Book Button */}
            <Link
              to="/addbook"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full mb-8 block"
            >
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-5 rounded-2xl font-bold text-xl text-center shadow-2xl hover:shadow-pink-500/50 transform hover:scale-105 transition flex items-center justify-center gap-4">
                <Plus className="w-8 h-8" />
                Add New Book
              </div>
            </Link>

            {/* Rest of mobile menu items... */}
            <div className="space-y-6">
              <Link to="/" className="block text-xl font-medium hover:text-purple-600 transition" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link to="/all-books" className="block text-xl font-medium hover:text-purple-600 transition" onClick={() => setIsMobileMenuOpen(false)}>
                All Books
              </Link>
            </div>

            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="mt-10 w-full py-5 bg-gray-100 dark:bg-gray-800 rounded-2xl font-bold text-lg flex items-center justify-center gap-4 hover:shadow-lg transition"
            >
              {isDarkMode ? <Sun className="w-7 h-7" /> : <Moon className="w-7 h-7" />}
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;