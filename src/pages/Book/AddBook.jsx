import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, BookOpen, Calendar, Hash, User, DollarSign, FileText, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import axios from "axios";

const AddBook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const [formData, setFormData] = useState({
    bookName: "",
    bookPrice: "",
    authorName: "",
    bookDescription: "",
    isbnNumber: "",
    publication: "",
    publishedAt: "",
    bookImage: null,
  });

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" })); 
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, bookImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.bookImage) errors.image = "Please upload a book cover image";
    if (formData.bookName.length < 2) errors.bookName = "Book title must be at least 2 characters long.";
    if (!formData.bookPrice || parseFloat(formData.bookPrice) <= 0) errors.bookPrice = "Price must be a positive number.";
    if (formData.authorName.length < 3) errors.authorName = "Author name must be at least 3 characters long";
    if (formData.bookDescription.length < 5) errors.bookDescription = "Description must be at least 5 characters long.";
    if (!/^\d{13,}$/.test(formData.isbnNumber)) errors.isbnNumber = "ISBN must be at least 13 digits";
    if (!formData.publication) errors.publication = "Publication is required";
    if (!formData.publishedAt) errors.publishedAt = "Published date is required";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      const response = await axios.post("http://localhost:3000/books", data);

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Book Added Successfully!");
        
        // Reset form
        setFormData({
          bookName: "",
          bookPrice: "",
          authorName: "",
          bookDescription: "",
          isbnNumber: "",
          publication: "",
          publishedAt: "",
          bookImage: null,
        });
        setImagePreview(null);
        setFieldErrors({});

        setTimeout(() => navigate("/all-books"), 3000);
      } else {
        setErrorMessage(result.message || "Failed to add book");
      }
    } catch (err) {
      console.error("Error adding book:", err);
      // setErrorMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Add New Book
          </h1>
          <p className="text-xl text-gray-600">Share your favorite books with the world</p>
          <div className="w-32 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-10 space-y-8">
          {/* Image Upload */}
          <div className="flex flex-col items-center">
            <label className="block text-2xl font-bold text-gray-800 mb-6">Book Cover</label>
            <div className="relative group">
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="w-150 h-96 object-cover rounded-2xl shadow-xl" />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData((prev) => ({ ...prev, bookImage: null }));
                    }}
                    className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition"
                  >
                    <X className="w-6 h-6 cursor-pointer" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="bookImage"
                  className="cursor-pointer w-80 h-96 bg-gradient-to-br from-gray-100 to-gray-200 border-4 border-dashed border-gray-400 rounded-2xl flex flex-col items-center justify-center hover:border-purple-500 transition-all group"
                >
                  <Upload className="w-20 h-20 text-gray-400 group-hover:text-purple-600 transition" />
                  <p className="mt-4 text-xl font-semibold text-gray-600">Click to upload cover</p>
                  <p className="text-sm text-gray-500 mt-2">JPG, PNG up to 10MB</p>
                  <input id="bookImage" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              )}
            </div>
            {fieldErrors.image && <p className="text-red-600 text-sm mt-2">{fieldErrors.image}</p>}
          </div>

          {/* Form Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-3">
                <BookOpen className="w-6 h-6 text-purple-600" />
                Book Title
              </label>
              <input
                type="text"
                name="bookName"
                value={formData.bookName}
                onChange={handleInputChange}
                className="w-full px-6 py-4 rounded-xl border focus:ring-4 focus:ring-purple-500/20 outline-none transition"
                placeholder="Enter book title"
              />
              {fieldErrors.bookName && <p className="text-red-600 text-sm mt-2">{fieldErrors.bookName}</p>}
            </div>

            <div>
              <label className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-3">
                <DollarSign className="w-6 h-6 text-green-600" />
                Price (Rs.)
              </label>
              <input
                type="number"
                name="bookPrice"
                value={formData.bookPrice}
                onChange={handleInputChange}
                className="w-full px-6 py-4 rounded-xl border focus:ring-4 focus:ring-green-500/20 outline-none transition"
                placeholder="999"
              />
              {fieldErrors.bookPrice && <p className="text-red-600 text-sm mt-2">{fieldErrors.bookPrice}</p>}
            </div>

            <div>
              <label className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-3">
                <User className="w-6 h-6 text-blue-600" />
                Author Name
              </label>
              <input
                type="text"
                name="authorName"
                value={formData.authorName}
                onChange={handleInputChange}
                className="w-full px-6 py-4 rounded-xl border focus:ring-4 focus:ring-blue-500/20 outline-none transition"
                placeholder="Enter author name"
              />
              {fieldErrors.authorName && <p className="text-red-600 text-sm mt-2">{fieldErrors.authorName}</p>}
            </div>

            <div>
              <label className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-3">
                <Hash className="w-6 h-6 text-orange-600" />
                ISBN Number
              </label>
              <input
                type="text"
                name="isbnNumber"
                value={formData.isbnNumber}
                onChange={handleInputChange}
                className="w-full px-6 py-4 rounded-xl border focus:ring-4 focus:ring-orange-500/20 outline-none transition"
                placeholder="9780134190440"
              />
              {fieldErrors.isbnNumber && <p className="text-red-600 text-sm mt-2">{fieldErrors.isbnNumber}</p>}
            </div>

            <div>
              <label className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-3">
                <FileText className="w-6 h-6 text-pink-600" />
                Publication
              </label>
              <input
                type="text"
                name="publication"
                value={formData.publication}
                onChange={handleInputChange}
                className="w-full px-6 py-4 rounded-xl border focus:ring-4 focus:ring-pink-500/20 outline-none transition"
                placeholder="e.g., O'Reilly"
              />
              {fieldErrors.publication && <p className="text-red-600 text-sm mt-2">{fieldErrors.publication}</p>}
            </div>

            <div>
              <label className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-3">
                <Calendar className="w-6 h-6 text-indigo-600" />
                Published Date
              </label>
              <input
                type="date"
                name="publishedAt"
                value={formData.publishedAt}
                onChange={handleInputChange}
                className="w-full px-6 py-4 rounded-xl border focus:ring-4 focus:ring-indigo-500/20 outline-none transition"
              />
              {fieldErrors.publishedAt && <p className="text-red-600 text-sm mt-2">{fieldErrors.publishedAt}</p>}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-3">
              <FileText className="w-6 h-6 text-purple-600" />
              Book Description
            </label>
            <textarea
              name="bookDescription"
              value={formData.bookDescription}
              onChange={handleInputChange}
              rows="6"
              className="w-full px-6 py-4 rounded-xl border focus:ring-4 focus:ring-purple-500/20 outline-none transition resize-none"
              placeholder="Write a compelling description..."
            />
            {fieldErrors.bookDescription && <p className="text-red-600 text-sm mt-2">{fieldErrors.bookDescription}</p>}
          </div>

          {/* Submit Button + Messages */}
          <div className="flex flex-col items-center pt-8 space-y-6">
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer group relative inline-flex items-center gap-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-12 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-pink-500/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Adding Book...
                </>
              ) : (
                <>
                  <BookOpen className="w-7 h-7" />
                  Add Book to Library
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                    New
                  </span>
                </>
              )}
            </button>

            {/* Success Message Below Button */}
            {successMessage && (
              <div className="flex items-center gap-3 text-green-600 font-bold text-xl animate-bounce">
                <CheckCircle className="w-8 h-8" />
                {successMessage}
              </div>
            )}

            {/* Backend Error Message */}
            {errorMessage && (
              <div className="flex items-center gap-3 text-red-600 font-semibold text-lg animate-pulse">
                <AlertCircle className="w-7 h-7" />
                {errorMessage}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;