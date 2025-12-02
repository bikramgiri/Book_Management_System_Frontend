import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]); // ← better name: books (plural)

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:3000/books");
      const result = await response.json();

      // The actual array is inside result.data
      setBooks(result.data || []);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]); // prevent crash on error
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Show loading or empty state
  if (books.length === 0) {
    return <div className="text-center text-gray-500">Loading books...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      <div className="col-span-full">
      <h2 className="text-4xl text-pink-500 font-semibold mb-4 text-center">Recommended Books</h2>
      <div className="w-65 h-1 bg-blue-500 mx-auto mb-10"></div>
      </div>
      {books.map((book) => (
        <div
          key={book._id}
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
        >
          <img
            className="w-full h-64 object-cover"
            src={book.bookImage || "/Book.jpg"} 
            alt={book.bookName}
          />
          <div className="p-6">
            <div className="flex justify-end mb-4">
            <span className="inline-block bg-blue-200 dark:text-pink-600 text-md px-3 py-1 rounded-full">
              Technology
            </span>
          </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">
              {book.bookName}
            </h2>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {book.bookDescription || "No description available"}
            </p>
            <div className="flex justify-between items-center">
              <Link
                to={`/book/${book._id}`} // optional: dynamic link
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Read More
              </Link>
              <span className="text-md font-bold text-gray-800">
                By : {book.autherName || "Unknown"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Books;