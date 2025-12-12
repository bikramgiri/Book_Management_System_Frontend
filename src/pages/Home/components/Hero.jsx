import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Sparkles, ArrowRight, Users, Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 min-h-screen flex items-center">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-8xl mx-auto px-6 py-24 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-23 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg border border-white/30 text-white px-5 py-2 rounded-full text-sm font-medium animate-pulse">
              <Sparkles className="w-5 h-5" />
              <span>#1 Online Bookstore in 2025</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Discover Your
              <span className="block text-yellow-300">Next Great Read</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto lg:mx-0">
              Join thousands of readers exploring millions of books. From bestsellers to hidden gems — find your story today.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start text-white">
              <div className="text-center">
                <div className="text-4xl font-bold">50K+</div>
                <div className="text-white/80">Happy Readers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold flex items-center gap-1">
                  4.9 <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="text-white/80">User Rating</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">1M+</div>
                <div className="text-white/80">Books Available</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link
                to="/all-books"
                className="group inline-flex items-center justify-center gap-3 bg-white text-purple-600 px-8 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-pink-500/50 transform hover:scale-105 transition-all duration-300"
              >
                <BookOpen className="w-6 h-6" />
                Explore Books
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition" />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-3 bg-white/20 backdrop-blur-md border-2 border-white/40 text-white px-8 py-5 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300"
              >
                <Users className="w-5 h-5" />
                Join Community
              </Link>
            </div>
          </div>

          {/* Right Side - Floating Books */}
          <div className="relative h-96 lg:h-full flex items-center justify-center">
            <div className="relative">
              {/* Floating Book 1 */}
              <div className="absolute top-0 left-10 w-48 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl rotate-12 hover:rotate-6 transition-transform duration-500 cursor-pointer border-4 border-white">
                <div className="w-full h-full rounded-xl flex items-center justify-center text-white font-bold text-2xl p-4 text-center">
                  Fiction
                </div>
              </div>

              {/* Floating Book 2 */}
              <div className="absolute top-20 right-0 w-56 h-72 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl shadow-2xl -rotate-12 hover:-rotate-3 transition-transform duration-500 cursor-pointer border-4 border-white">
                <div className="w-full h-full rounded-xl flex items-center justify-center text-white font-bold text-3xl p-4 text-center">
                  Romance
                </div>
              </div>

              {/* Floating Book 3 */}
              <div className="absolute bottom-10 left-20 w-52 h-68 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl shadow-2xl rotate-6 hover:rotate-12 transition-transform duration-500 cursor-pointer border-4 border-white">
                <div className="w-full h-full rounded-xl flex items-center justify-center text-white font-bold text-3xl p-4 text-center">
                  Science
                </div>
              </div>

              {/* Center Main Book */}
              <div className="relative z-10 w-64 h-96 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer border-8 border-white">
                <div className="w-full h-full rounded-3xl flex flex-col items-center justify-center text-white p-8 text-center">
                  <BookOpen className="w-20 h-20 mb-4" />
                  <p className="text-4xl font-bold">BookHub</p>
                  <p className="text-lg opacity-90">Your Reading Journey Starts Here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-4 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;