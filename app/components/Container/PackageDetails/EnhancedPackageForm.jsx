import { submitEnquiry } from "@/app/store/slice/enquirySlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FloatingLabelInput } from "@/app/common/FloatingLabelInput";
import { BookText } from "lucide-react";

export const EnhancedPackageForm = ({ packageId, packageName }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.enquiry);

    const [formData, setFormData] = useState({
        packageId: packageId,
        name: "",
        email: "",
        phone: "",
        country: "",
        numberOfPersons: "",
        date: "",
        departureDate: "",
        message: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        country: "",
        numberOfPersons: "",
        date: "",
        departureDate: "",
        message: "",
    });

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            packageId: packageId
        }));
    }, [packageId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'numberOfPersons') {
            const numValue = parseInt(value) || 1;
            setFormData({ ...formData, [name]: numValue });
        } else {
            setFormData({ ...formData, [name]: value });
        }

        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.packageId) {
            newErrors.packageId = "Package ID is required";
            isValid = false;
        }

        if (!formData.name.trim()) {
            newErrors.name = "Full name is required";
            isValid = false;
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
            isValid = false;
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
            isValid = false;
        } else if (!/^[0-9+\-\s()]{10,15}$/.test(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number";
            isValid = false;
        }

        if (!formData.country.trim()) {
            newErrors.country = "Country is required";
            isValid = false;
        }

        if (!formData.date) {
            newErrors.date = "Arrival date is required";
            isValid = false;
        } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const arrivalDate = new Date(formData.date);
            if (arrivalDate < today) {
                newErrors.date = "Arrival date must be in the future";
                isValid = false;
            }
        }

        if (!formData.departureDate) {
            newErrors.departureDate = "Departure date is required";
            isValid = false;
        } else if (formData.date) {
            const arrivalDate = new Date(formData.date);
            const departureDate = new Date(formData.departureDate);
            if (departureDate < arrivalDate) {
                newErrors.departureDate = "Departure date cannot be earlier than arrival date";
                isValid = false;
            }
        }

        if (!formData.numberOfPersons || formData.numberOfPersons < 0) {
            newErrors.numberOfPersons = "At least 1 person is required";
            isValid = false;
        } else if (formData.numberOfPersons > 50) {
            newErrors.numberOfPersons = "Maximum 50 persons allowed. For larger groups, please contact us directly.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmitClick = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const submitData = {
                ...formData,
                packageId: packageId
            };
            dispatch(submitEnquiry(submitData));
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const hasErrors = Object.keys(errors).some(key => errors[key]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-4 sm:p-6 md:p-8 rounded-sm shadow-2xl border border-gray-100 min-h-[650px] overflow-y-auto scrollbar-hide"
        >
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-red-600 p-3 sm:p-4 rounded-lg sm:rounded-2xl text-white">
                    <BookText size={24} className="sm:w-[30px] sm:h-[30px]" />
                </div>
                <div>
                    <h4 className="font-black">Grab This Package</h4>
                    <div className="text-gray-500 text-xs flex flex-col">{packageName}</div>
                </div>
            </div>
            {hasErrors && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 font-semibold mb-2 text-sm sm:text-base">Please fix the following errors:</p>
                    <ul className="list-disc list-inside text-xs sm:text-sm text-red-500">
                        {Object.values(errors).map((error, index) => error && <li key={index}>{error}</li>)}
                    </ul>
                </div>
            )}

            <form className="space-y-2" onSubmit={handleSubmitClick}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                    <FloatingLabelInput
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        error={errors.name}
                    />
                    <FloatingLabelInput
                        label="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        type="email"
                        error={errors.email}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                    <FloatingLabelInput
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        type="tel"
                        error={errors.phone}
                    />
                    <FloatingLabelInput
                        label="Country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        error={errors.country}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                    <FloatingLabelInput
                        label="Number of Persons"
                        name="numberOfPersons"
                        value={formData.numberOfPersons}
                        onChange={handleChange}
                        type="number"
                        max="50"
                        required
                        error={errors.numberOfPersons}
                        placeholder="Enter number of travelers"
                    />
                </div>

                {/* Date Fields with Labels */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <div className="relative">
                        <label className="block text-xs font-medium ps-1 text-gray-600">
                            Departure Date
                        </label>
                        <FloatingLabelInput
                            name="departureDate"
                            type="date"
                            value={formData.departureDate}
                            onChange={handleChange}
                            min={
                                formData.date ||
                                new Date().toISOString().split("T")[0]
                            }
                            required
                            error={errors.departureDate}
                        />
                    </div>
                    <div className="relative">
                        <label className="block text-xs ps-1 font-medium text-gray-600">
                            Arrival Date
                        </label>
                        <FloatingLabelInput
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            min={new Date().toISOString().split("T")[0]}
                            required
                            error={errors.date}
                        />
                    </div>


                </div>

                <FloatingLabelInput
                    label="Special Requests"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    isTextarea
                    placeholder="Tell us about your preferences, dietary requirements, or any special requests..."
                />

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 bg-red-600 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:bg-red-700 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                    {loading ? "Processing..." : "Book This Package"}
                </motion.button>
            </form>
        </motion.div>
    );
};