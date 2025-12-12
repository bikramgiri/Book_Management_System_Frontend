import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, User, Calendar, Sparkles } from "lucide-react";
import { BACKEND_URL } from "../../../config";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/books`);
      if (!response.ok) throw new Error("Failed to fetch");

      const result = await response.json();
      setBooks(result.data || []);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Skeleton Loading
  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="bg-gray-300 h-80 w-full"></div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="flex justify-between items-center pt-4">
          <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
          <div className="h-6 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section className="py-16 px-6 bg-gradient-to-b from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
              Recommended Books
            </h2>
            <p className="text-xl text-gray-600">Discover your next great read</p>
            <div className="w-32 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (books.length === 0) {
    return (
      <section className="py-32 text-center bg-gradient-to-b from-purple-50 to-pink-50">
        <div className="text-6xl mb-4">No books found</div>
        <p className="text-xl text-gray-600">Check back later for new arrivals!</p>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-8xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-yellow-500" />
            <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
              Recommended Books
            </h2>
            <Sparkles className="w-10 h-10 text-yellow-500" />
          </div>
          <p className="text-xl text-gray-600 mt-4">Handpicked just for you</p>
          <div className="w-48 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mx-auto mt-6 rounded-full shadow-lg"></div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <div
              key={book._id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Book Cover */}
              <Link to={`/book/${book._id}`} className="block relative overflow-hidden">
                <img
                  src={book.bookImage || "/Book.jpg"}
                  alt={book.bookName}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <p className="text-lg font-bold truncate">{book.bookName}</p>
                  <p className="text-sm opacity-90">
                    by {book.autherName || book.authorName || "Unknown"}
                  </p>
                </div>
              </Link>

              {/* Card Content */}
              <div className="p-6 bg-gradient-to-b from-white to-gray-50">
                {/* Category Badge */}
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-md">
                    Technology
                  </span>
                  <span className="text-2xl font-bold text-pink-600">Rs. {book.bookPrice}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-pink-600 transition">
                  {book.bookName}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-5 line-clamp-2">
                  {book.bookDescription || "An amazing book that will inspire and educate you."}
                </p>

                {/* Author & CTA */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User size={18} />
                    <span className="text-sm font-medium">
                      {book.autherName || book.authorName || "Unknown"}
                    </span>
                  </div>

                  <Link
                    to={`/book/${book._id}`}
                    className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition flex items-center gap-2"
                  >
                    <BookOpen size={18} />
                    Read More
                  </Link>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                New
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link
            to="/all-books"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-bold hover:shadow-2xl transform hover:scale-105 transition"
          >
            View All Books
            <Sparkles className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Books;