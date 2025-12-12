import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Upload, BookOpen, Calendar, Hash, User, DollarSign, FileText, X, CheckCircle, AlertCircle, Loader2, ArrowLeft } from "lucide-react";
import axios from "axios";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const [formData, setFormData] = useState({
    bookName: "",
    bookPrice: "",
    authorName: "",
    bookDescription: "",
    isbnNumber: "",
    publication: "",
    publishedAt: "",
    bookImage: null, // new file if changed
  });

  // Fetch book data on mount
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:3000/book/${id}`);
        if (!response.ok) throw new Error("Book not found");

        const result = await response.json();
        const book = result.data;

        setFormData({
          bookName: book.bookName || "",
          bookPrice: book.bookPrice || "",
          authorName: book.authorName || book.autherName || "",
          bookDescription: book.bookDescription || "",
          isbnNumber: book.isbnNumber || "",
          publication: book.publication || "",
          publishedAt: book.publishedAt ? book.publishedAt.split("T")[0] : "",
          bookImage: null,
        });

        setImagePreview(book.bookImage || "/Book.jpg");
      } catch (err) {
        console.error(err, "Error fetching book data");
        setErrorMessage("Failed to load book data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBook();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFieldErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, bookImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    {
    const errors = {};

    if (formData.bookName.length < 2) errors.bookName = "Book title must be at least 2 characters";
    if (!formData.bookPrice || parseFloat(formData.bookPrice) <= 0) errors.bookPrice = "Price must be positive";
    if (formData.authorName.length < 3) errors.authorName = "Author name must be at least 3 characters";
    if (formData.bookDescription.length < 5) errors.bookDescription = "Description must be at least 5 characters";
    if (!/^\d{13,}$/.test(formData.isbnNumber)) errors.isbnNumber = "ISBN must be 13+ digits";
    if (!formData.publication) errors.publication = "Publication is required";
    if (!formData.publishedAt) errors.publishedAt = "Published date is required";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    const data = new FormData();
    // Only append fields that changed or always needed
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== "") {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.patch(`http://localhost:3000/book/${id}`, data, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
      });

      if (response.status === 200) {
        setSuccessMessage("Book updated successfully!");
        setTimeout(() => navigate(`/book/${id}`), 2000);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to update book";
      setErrorMessage(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-pink-600 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading book...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Edit Book
          </h1>
          <p className="text-xl text-gray-600">Update book details</p>
          <div className="w-32 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-10 space-y-8">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="cursor-pointer flex items-center gap-2 text-pink-600 hover:text-pink-700 font-semibold mb-6"
          >
            <ArrowLeft className="w-6 h-6" />
            Back
          </button>

          {/* Image Upload */}
          <div className="flex flex-col items-center">
            <label className="block text-2xl font-bold text-gray-800 mb-6">Book Cover</label>
            <div className="relative group">
              <img
                src={imagePreview}
                alt="Current cover"
                className="w-180 h-100 object-cover rounded-2xl shadow-xl"
              />
              <label
                htmlFor="newImage"
                className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
              >
                <div className="text-white text-center">
                  <Upload className="w-12 h-12 mx-auto mb-2" />
                  <p className="font-bold">Change Image</p>
                </div>
                <input
                  id="newImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
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
              placeholder="Update description..."
            />
            {fieldErrors.bookDescription && <p className="text-red-600 text-sm mt-2">{fieldErrors.bookDescription}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex flex-col items-center pt-8 space-y-6">
            <button
              type="submit"
              disabled={submitting}
              className="cursor-pointer group relative inline-flex items-center gap-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-12 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-pink-500/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Updating Book...
                </>
              ) : (
                <>
                  <BookOpen className="w-7 h-7" />
                  Update Book
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                    Edit
                  </span>
                </>
              )}
            </button>

            {/* Success Message */}
            {successMessage && (
              <div className="flex items-center gap-3 text-green-600 font-bold text-2xl animate-bounce">
                <CheckCircle className="w-10 h-10" />
                {successMessage}
              </div>
            )}

            {/* Error Message */}
            {/* {errorMessage && (
              <div className="flex items-center gap-3 text-red-600 font-semibold text-xl animate-pulse">
                <AlertCircle className="w-9 h-9" />
                {errorMessage}
              </div>
            )} */}
          </div>
          {/* <p className="text-green-600 font-semibold text-center mt-4">
            {successMessage}
          </p> */}
        </form>
      </div>
    </div>
  );
};

export default EditBook;