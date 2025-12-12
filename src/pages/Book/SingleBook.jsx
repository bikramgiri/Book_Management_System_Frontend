import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  User,
  BookOpen,
  ShoppingCart,
  Trash2,
  Edit,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import axios from "axios";

const SingleBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setErrorMessage] = useState("");

  const fetchBook = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/book/${id}`);
      if (response.status !== 200) throw new Error("Book not found");

      const result = await response.data;
      setBook(result.data);
    } catch (err) {
      console.error(err, " Error fetching book details");
      setErrorMessage("Failed to load book details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    // if (!window.confirm("Are you sure you want to delete this book?")) return;

    setDeleting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.delete(`http://localhost:3000/book/${id}`);

      if (response.status === 200) {
        setSuccessMessage("Book deleted successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        const result = await response.json();
        setErrorMessage(result.message || "Failed to delete book");
      }
    } catch (err) {
      console.error(err, " Error deleting book");
      setErrorMessage("Network error. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-pink-600 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  // Not Found / Error State
  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center p-12 bg-white rounded-3xl shadow-2xl">
          <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Book Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Sorry, we couldn't find this book.
          </p>
          <button
            onClick={() => navigate("/all-books")}
            className="px-10 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-bold hover:shadow-xl transform hover:scale-105 transition"
          >
            Back to Books
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer mb-10 flex items-center gap-3 text-pink-600 hover:text-pink-700 font-semibold text-lg transition"
        >
          <ArrowLeft className="w-6 h-6 cursor-pointer" />
          Back to Books
        </button>

        {/* Messages */}
        {/* {successMessage && (
          <div className="mb-8 flex items-center justify-center gap-4 text-green-600 font-bold text-2xl animate-bounce">
            <CheckCircle className="w-10 h-10" />
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-8 flex items-center justify-center gap-4 text-red-600 font-semibold text-xl animate-pulse">
            <AlertCircle className="w-9 h-9" />
            {error}
          </div>
        )} */}

        <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Book Cover */}
          <div className="relative group overflow-hidden">
            <img
              src={book.bookImage || "/Book.jpg"}
              alt={book.bookName}
              className="w-full h-full object-cover min-h-[600px] group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
              <div className="text-white">
                <h1 className="text-4xl font-bold mb-2 drop-shadow-2xl">
                  {book.bookName}
                </h1>
                <p className="text-xl opacity-90 mt-2">
                  by {book.autherName || book.authorName}
                </p>
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="p-10 lg:p-16 flex flex-col">
            <div className="flex-1">
              {/* Badge + Price */}
              <div className="flex justify-between items-start mb-8">
                <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg">
                  Premium Edition
                </span>
                <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                  Rs. {book.bookPrice}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
                {book.bookName}
              </h1>

              {/* Author */}
              <div className="flex items-center gap-4 text-gray-700 mb-8">
                <User className="w-7 h-7 text-purple-600" />
                <span className="text-2xl font-medium">
                  {book.autherName || book.authorName || "Unknown Author"}
                </span>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-50 dark:bg-gray-100 p-6 rounded-2xl">
                  <p className="text-sm text-gray-600 mb-1">Published Date</p>
                  <p className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    {book.publishedAt
                      ? new Date(book.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-100 p-6 rounded-2xl">
                  <p className="text-sm text-gray-600 mb-1">ISBN</p>
                  <p className="text-xl font-mono font-bold text-gray-800">
                    {book.isbnNumber || "N/A"}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-pink-600" />
                  About This Book
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {book.bookDescription ||
                    "No description available for this book."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <button className="cursor-pointer flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-5 px-10 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition flex items-center justify-center gap-4">
                    <ShoppingCart className="w-8 h-8" />
                    Add to Cart
                  </button>
                  <button className="cursor-pointer px-10 py-5 border-2 border-pink-600 text-pink-600 rounded-2xl font-bold text-xl hover:bg-pink-600 hover:text-white transition">
                    Read Sample
                  </button>
                </div>
                {/* Admin Actions */}
                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <Link
                    to={`/editbook/${book._id}`}
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition text-center flex items-center justify-center gap-3"
                  >
                    <Edit className="w-6 h-6" />
                    Edit Book
                  </Link>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="cursor-pointer flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {deleting ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <Trash2 className="w-6 h-6" />
                    )}
                    {deleting ? "Deleting..." : "Delete Book"}
                  </button>
                </div>
                {/* Display book delete successMessage */}
                <p className="text-green-600 font-semibold text-center mt-4">
                  {successMessage}
                </p>
                {error && (
                  <div className="mb-8 flex items-center justify-center gap-4 text-red-600 font-semibold text-xl animate-pulse">
                    <AlertCircle className="w-9 h-9" />
                    {error}
                  </div>
                )}{" "}
                {error && (
                  <div className="mb-8 flex items-center justify-center gap-4 text-red-600 font-semibold text-xl animate-pulse">
                    <AlertCircle className="w-9 h-9" />
                    {error}
                  </div>
                )}
              </div>
            </div>

            {/* Book ID Footer */}
            <p className="text-center text-gray-500 mt-12 text-sm">
              Book ID: <span className="font-mono">{book._id}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
