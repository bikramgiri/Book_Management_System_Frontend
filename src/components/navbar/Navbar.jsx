import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, Sun, Moon, User, LogOut, Settings } from "lucide-react";

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

    // Initial check
    handleChange({ matches: mediaQuery.matches });

    // Listen for system changes
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

  // Mock user (replace with real auth later)
  const user = { name: "Ram Kumar", email: "ram@example.com", image: null };

  return (
    <>
      {/* Desktop & Mobile Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-800/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition">
              B
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              BookHub
            </span>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-10">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-600 transition" />
              <input
                type="text"
                placeholder="Search books, authors..."
                className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-100 dark:bg-gray-600 border border-transparent focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all duration-300"
              />
              <kbd className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-600 hidden xl:block">
                Ctrl+K
              </kbd>
            </div>
          </div>

          <div>
            <Link
              to="/addbook"
              className="px-5 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-medium hover:shadow-xl transition"
            >
              Add Book
            </Link>
          </div>

          {/* Desktop Right Icons */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition group"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-purple-600 transition" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
                3
              </span>
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition group"
            >
              {isDarkMode ? (
                <Sun className="w-6 h-6 text-yellow-500 group-hover:rotate-180 transition duration-500" />
              ) : (
                <Moon className="w-6 h-6 text-gray-700 group-hover:rotate-180 transition duration-500" />
              )}
            </button>

            {/* User Profile */}
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  {user.name.charAt(0)}
                </div>
                {/* <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{user.name}</p>
                  <p className="text-xs text-gray-500">Premium Member</p>
                </div> */}
              </button>

              {/* Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fadeIn">
                  <div className="p-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-2xl font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold">{user.name}</p>
                        <p className="text-sm opacity-90">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 space-y-1">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      <User className="w-5 h-5" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      <Settings className="w-5 h-5" />
                      <span>Settings</span>
                    </Link>
                    <hr className="my-2 border-gray-200 dark:border-gray-700" />
                    <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 w-full transition">
                      <LogOut className="w-5 h-5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl animate-slideIn">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Menu
                </h3>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search books..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-purple-500/20"
                />
              </div>

              {/* Quick Links */}
              <div className="space-y-3">
                <Link to="/" className="block py-3 text-lg font-medium hover:text-purple-600 transition">
                  Home
                </Link>
                <Link to="/all-books" className="block py-3 text-lg font-medium hover:text-purple-600 transition">
                  All Books
                </Link>
                <Link to="/categories" className="block py-3 text-lg font-medium hover:text-purple-600 transition">
                  Categories
                </Link>
              </div>

              {/* User Section */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-lg">{user.name}</p>
                    <p className="text-sm text-gray-500">Premium Member</p>
                  </div>
                </div>

                <button className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-2xl font-bold hover:shadow-xl transition">
                  View Profile
                </button>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-full py-4 bg-gray-100 dark:bg-gray-800 rounded-2xl font-medium flex items-center justify-center gap-3 hover:shadow-lg transition"
              >
                {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;