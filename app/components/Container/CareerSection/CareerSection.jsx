"use client";
import React, { useState, useEffect } from "react";
import MainLayout from "@/app/common/MainLayout";
import { useRouter } from "next/navigation";
import carrerbg from "@/app/assets/careerbg.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { submitCareerForm, clearCareerState, closePopup } from "@/app/store/slice/careerSlice";

const CareerSection = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [dragActive, setDragActive] = useState(false);
  const { loading, success, message, error, showPopup } = useSelector(
    (state) => state.career
  );

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    resume: null,
  });

  useEffect(() => {
    return () => {
      dispatch(clearCareerState());
    };
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const maxSize = 5 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        alert("Please upload a PDF, DOC, or DOCX file.");
        return;
      }

      if (file.size > maxSize) {
        alert("File size must be less than 5MB.");
        return;
      }

      setFormData((prev) => ({ ...prev, resume: file }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const maxSize = 5 * 1024 * 1024;
      if (!validTypes.includes(file.type)) {
        alert("Please upload a PDF, DOC, or DOCX file.");
        return;
      }
      if (file.size > maxSize) {
        alert("File size must be less than 5MB.");
        return;
      }
      setFormData((prev) => ({ ...prev, resume: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("mobile", formData.phone);
    formDataToSend.append("address", formData.address);
    if (formData.resume) {
      formDataToSend.append("resume", formData.resume);
    }

    const result = await dispatch(submitCareerForm(formDataToSend));
    if (result.type === "career/submitCareerForm/fulfilled") {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        resume: null,
      });
    }
  };

  const handleClosePopup = () => {
    dispatch(closePopup());
  };

  const Popup = () => {
    const isSuccess = success && !error;
    const title = isSuccess ? "✅ Success!" : "❌ Error!";
    const messageText = isSuccess
      ? message || "Your application has been submitted successfully!"
      : error || "Something went wrong. Please try again.";

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all relative">
          <button
            onClick={handleClosePopup}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex justify-center mb-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isSuccess ? "bg-green-100" : "bg-red-100"
              }`}>
              {isSuccess ? (
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
          </div>
          <h3 className={`text-2xl font-bold text-center ${isSuccess ? "text-green-700" : "text-red-700"
            } mb-2`}>
            {title}
          </h3>
          <p className={`text-center ${isSuccess ? "text-green-600" : "text-red-600"
            } mb-6`}>
            {messageText}
          </p>
          <button
            onClick={handleClosePopup}
            className={`w-full py-3 text-white font-semibold rounded-lg transition ${isSuccess
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
              }`}
          >
            {isSuccess ? "Done" : "Try Again"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <MainLayout className="bg-[#FCE7E7]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex flex-col md:flex-row items-center md:items-stretch min-h-[280px] md:min-h-[340px]">
            <div className="w-full md:w-1/2 flex flex-col justify-center py-8 md:py-0">
              <h3 className="text-[#E32424] text-3xl md:text-5xl font-bold">
                Careers
              </h3>
              <p className="mt-3 text-gray-800 text-base md:text-xl max-w-md">
                Turn your passion into a rewarding career with us.
              </p>
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-end h-full">
              <Image
                src={carrerbg}
                alt="Career Banner"
                className="w-full h-full max-h-[340px] object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </MainLayout>

      <MainLayout className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="text-start mb-12 max-w-4xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Apply for Your Dream Job
          </h3>
          <p className="text-gray-600 text-lg">
            Complete the form below and upload your resume to apply. Our
            recruitment team will review your application and contact you if
            your profile matches our requirements.
          </p>
        </div>

        <div className="max-w-4xl mx-auto shadow-2xl p-10 rounded-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition "
                required
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition "
                required
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition "
                required
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your current address"
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition "
                required
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="resume"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Resume / CV
              </label>

              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition ${dragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 bg-gray-50"
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={loading}
                />

                <div className="pointer-events-none">
                  <svg
                    className="w-12 h-12 mx-auto text-gray-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-gray-600">
                    <span className="font-semibold text-red-600">
                      Upload a file
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    PDF, DOC, DOCX up to 5MB
                  </p>
                  {formData.resume && (
                    <p className="text-sm text-green-600 mt-2 font-medium">
                      ✓ {formData.resume.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 bg-primary text-white font-semibold rounded-lg transition duration-200 shadow-md hover:shadow-lg ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-primary-dark"
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Application"
              )}
            </button>

            <p className="text-sm text-gray-500 text-center mt-4">
              Your resume and personal information will be used only for
              recruitment purposes.
            </p>
          </form>
        </div>
      </MainLayout>
      {showPopup && <Popup />}
    </>
  );
};

export default CareerSection;