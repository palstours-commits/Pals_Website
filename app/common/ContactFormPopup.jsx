"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { FaXmark } from 'react-icons/fa6';
import { FloatingLabelInput } from "@/app/common/FloatingLabelInput";
import { FloatingLabelSelect } from "@/app/common/FloatingLabelSelect";
import Message_Popups from "@/app/common/Message_Popups";
import { clearContactState, submitContact } from "@/app/store/slice/contactSlice";

const initialForm = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    phone: "",
    country: "", // ✅ Added country field
    tentativeDateOfArrival: "",
    departureDate: "",
    guestCount: "",
    accommodationType: "",
    comments: "",
};

const initialErrors = {
    emailAddress: "",
    phone: "",
    guestCount: "",
    comments: "",
};

const ContactFormPopup = ({ isOpen, onClose }) => {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState(initialErrors);
    const [showResultPopup, setShowResultPopup] = useState(false);
    const [popupType, setPopupType] = useState("success");
    const [popupMessage, setPopupMessage] = useState("");

    const dispatch = useDispatch();
    const { error, message, loading } = useSelector((state) => state.contact);

    useEffect(() => {
        if (message) {
            const responseMessage =
                message?.message ||
                message?.data?.message ||
                (typeof message === "string" ? message : null) ||
                "Thank you for contacting us. We'll get back to you soon!";

            setPopupType("success");
            setPopupMessage(responseMessage);
            setShowResultPopup(true);
            setForm(initialForm);
            setErrors(initialErrors);
            dispatch(clearContactState());
            onClose();
        }

        if (error) {
            const errorMessage =
                error?.message ||
                error?.data?.message ||
                (typeof error === "string" ? error : null) ||
                "Something went wrong. Please try again.";

            setPopupType("error");
            setPopupMessage(errorMessage);
            setShowResultPopup(true);
            dispatch(clearContactState());
        }
    }, [message, error, dispatch, onClose]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!form.emailAddress.trim()) {
            newErrors.emailAddress = "Email is required";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailAddress)) {
            newErrors.emailAddress = "Please enter a valid email address";
            isValid = false;
        }

        if (!form.phone.trim()) {
            newErrors.phone = "Phone number is required";
            isValid = false;
        }

        if (!form.guestCount.toString().trim()) {
            newErrors.guestCount = "Number of guests is required";
            isValid = false;
        } else if (parseInt(form.guestCount) < 1) {
            newErrors.guestCount = "At least 1 guest is required";
            isValid = false;
        }

        if (!form.comments.trim()) {
            newErrors.comments = "Comments are required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmitClick = (e) => {
        e.preventDefault();

        if (validateForm()) {
            dispatch(
                submitContact({
                    name: `${form.firstName} ${form.lastName}`.trim(),
                    email: form.emailAddress,
                    mobile: form.phone,
                    country: form.country, // ✅ Now sending country from form
                    tourDescription: form.comments,
                    arrivalDate: form.tentativeDateOfArrival,
                    departureDate: form.departureDate,
                    stayType: form.accommodationType,
                    numberOfGuests: Number(form.guestCount),
                })
            );
        }
    };

    const handleClosePopups = () => {
        setShowResultPopup(false);
        setPopupMessage("");
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99998]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-2xl md:w-[600px] max-h-[90vh] bg-white rounded-2xl shadow-2xl z-[99999] flex flex-col overflow-hidden"
                        >
                            {/* Header */}
                            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 relative">
                                <h3 className="text-xl font-bold text-gray-900 text-center">
                                    <span className="inline-block border-b-2 border-red-600 pb-1">
                                        Plan My Tour
                                    </span>
                                </h3>

                                <button
                                    onClick={onClose}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                                >
                                    <FaXmark size={22} className="text-gray-500" />
                                </button>
                            </div>

                            {/* Form */}
                            <div className="flex-1 overflow-y-auto px-6 py-4">
                                <form onSubmit={handleSubmitClick}>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <FloatingLabelInput
                                                label="First Name"
                                                name="firstName"
                                                value={form.firstName}
                                                onChange={handleChange}
                                                placeholder="First Name"
                                            />
                                            <FloatingLabelInput
                                                label="Last Name"
                                                name="lastName"
                                                value={form.lastName}
                                                onChange={handleChange}
                                                placeholder="Last Name"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                                            <FloatingLabelInput
                                                label="Email Address"
                                                name="emailAddress"
                                                value={form.emailAddress}
                                                onChange={handleChange}
                                                required
                                                type="email"
                                                error={errors.emailAddress}
                                                placeholder="Email Address"
                                            />
                                            <FloatingLabelInput
                                                label="Phone Number"
                                                name="phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                                required
                                                type="tel"
                                                error={errors.phone}
                                                placeholder="Phone"
                                            />
                                        </div>

                                        {/* ✅ NEW: Country Field */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                                            <FloatingLabelInput
                                                label="Country"
                                                name="country"
                                                value={form.country}
                                                onChange={handleChange}
                                                placeholder="e.g. India, USA, UK"
                                            />
                                            <div>
                                                <FloatingLabelInput
                                                    label="Number of Guests"
                                                    type="number"
                                                    name="guestCount"
                                                    value={form.guestCount}
                                                    onChange={handleChange}
                                                    required
                                                    error={errors.guestCount}
                                                    placeholder="e.g. 2"
                                                    min="1"
                                                    max="99"
                                                />
                                            </div>

                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                                            <div className="relative">
                                                <label className="block text-xs ps-1 font-medium text-gray-600">
                                                    Arrival Date
                                                </label>
                                                <FloatingLabelInput
                                                    name="tentativeDateOfArrival"
                                                    type="date"
                                                    value={form.tentativeDateOfArrival}
                                                    onChange={handleChange}
                                                    min={new Date().toISOString().split("T")[0]}
                                                />
                                            </div>
                                            <div className="relative">

                                                <label className="block text-xs ps-1 font-medium text-gray-600">
                                                    Departure Date
                                                </label>
                                                <FloatingLabelInput
                                                    name="departureDate"
                                                    type="date"
                                                    value={form.departureDate}
                                                    onChange={handleChange}
                                                    min={
                                                        form.tentativeDateOfArrival ||
                                                        new Date().toISOString().split("T")[0]
                                                    }
                                                />
                                            </div>

                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mt-3">
                                            <FloatingLabelSelect
                                                isLabel={false}
                                                label="Select Accommodation Type"
                                                name="accommodationType"
                                                options={[
                                                    { _id: "Standard", name: "Standard" },
                                                    { _id: "Deluxe", name: "Deluxe" },
                                                    { _id: "Premium", name: "Premium" },
                                                    { _id: "Luxury", name: "Luxury" },
                                                ]}
                                                value={form.accommodationType}
                                                onChange={handleChange}
                                                placeholder="Select Type of Stay"
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <FloatingLabelInput
                                                label="Comments/ Questions/ Queries"
                                                name="comments"
                                                value={form.comments}
                                                onChange={handleChange}
                                                required
                                                isTextarea
                                                error={errors.comments}
                                                placeholder="Indicate the number of people travelling with you and submit more details about your request including destinations and activities you may want in your holiday"
                                            />
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        type="submit"
                                        disabled={loading}
                                        className="w-full mt-6 bg-red-600 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:bg-red-700 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                    >
                                        {loading ? "Processing..." : "Submit Enquiry"}
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <Message_Popups
                isOpen={showResultPopup}
                type={popupType}
                onClose={handleClosePopups}
            >
                <div className="text-center">
                    <p className="text-sm text-gray-800">{popupMessage}</p>
                </div>
            </Message_Popups>
        </>
    );
};

export default ContactFormPopup;