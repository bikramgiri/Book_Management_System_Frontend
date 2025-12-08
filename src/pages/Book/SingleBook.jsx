import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User, BookOpen, ShoppingCart } from "lucide-react";

const SingleBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchBook = async () => {
    try {
      const response = await fetch(`http://localhost:3000/book/${id}`);
      if (!response.ok) throw new Error("Book not found");

      const result = await response.json();
      setBook(result.data); // assuming your API returns { data: { ...book } }
    } catch (err) {
      console.error("Error fetching book:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-10 bg-white rounded-2xl shadow-lg">
          <div className="text-6xl mb-4">Book Not Found</div>
          <p className="text-gray-600 mb-8">Sorry, we couldn't find this book.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer mb-8 flex items-center gap-2 text-pink-600 hover:text-pink-700 transition font-medium"
        >
          <ArrowLeft size={24} />
          Back to Books
        </button>

        <div className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Book Cover */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition z-10"></div>
            <img
              src={book.bookImage || "/Book.jpg"}
              alt={book.bookName}
              className="w-full h-full object-cover min-h-[500px] group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-8 group-hover:translate-y-0 transition z-20">
              <p className="text-3xl font-bold drop-shadow-lg">{book.bookName}</p>
              <p className="text-lg opacity-90">by {book.autherName || book.authorName}</p>
            </div>
          </div>

          {/* Book Details */}
          <div className="p-10 flex flex-col justify-between">
            <div>
              {/* Category Badge */}
              <div className="flex justify-between items-start mb-6">
                <span className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Technology & Programming
                </span>
                <span className="text-3xl font-bold text-pink-600">Rs. {book.bookPrice}</span>
              </div>

              {/* Title & Author */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                {book.bookName}
              </h1>
              <div className="flex items-center gap-3 text-gray-600 mb-6">
                <User size={20} />
                <span className="text-lg font-medium">
                  {book.autherName || book.authorName || "Unknown Author"}
                </span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <BookOpen size={24} />
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {book.bookDescription || "No description available for this book."}
                </p>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-6 mb-10 text-gray-600">
                <div className="flex items-center gap-3">
                  <Calendar size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Published</p>
                    <p className="font-medium">
                      {book.publishedAt
                        ? new Date(book.publishedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Unknown"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                  <div>
                    <p className="text-sm text-gray-500">ISBN</p>
                    <p className="font-mono font-medium">{book.isbnNumber || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition flex items-center justify-center gap-3">
                <ShoppingCart size={24} />
                Add to Cart
              </button>
              <button className="px-8 py-4 border-2 border-pink-600 text-pink-600 rounded-xl font-bold hover:bg-pink-600 hover:text-white transition">
                Read Sample
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-16 text-gray-500">
          <p>Book ID: {book._id}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;