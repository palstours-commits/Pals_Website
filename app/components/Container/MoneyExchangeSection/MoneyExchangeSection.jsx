"use client";
import CommonHeroSection from '@/app/common/CommonHeroSection';
import { FloatingLabelInput } from "@/app/common/FloatingLabelInput";
import { FloatingLabelSelect } from "@/app/common/FloatingLabelSelect";
import MainLayout from "@/app/common/MainLayout";
import MoneyExchangeImg from "@/app/assets/money-exchange.png";
import { motion } from "framer-motion";
import {
    Mail,
} from 'lucide-react';
import { useState, useEffect } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const initialForm = {
    forexAmount: "",
    indianAmount: "",
    currencyFrom: "USD",
    currencyTo: "INR",
    phoneNo: "",
    email: "",
};

const defaultExchangeRates = [
    { currency: "USD", symbol: "$", rate: "83.50", name: "USD ($)" },
    { currency: "EUR", symbol: "€", rate: "89.20", name: "EUR (€)" },
    { currency: "GBP", symbol: "£", rate: "104.10", name: "GBP (£)" },
    { currency: "AED", symbol: "₿", rate: "22.73", name: "AED (₿)" },
    { currency: "SGD", symbol: "S$", rate: "62.15", name: "SGD (S$)" },
    { currency: "AUD", symbol: "A$", rate: "54.80", name: "AUD (A$)" },
    { currency: "CAD", symbol: "C$", rate: "61.40", name: "CAD (C$)" },
];


function MoneyExchangeSection() {
    const [formData, setFormData] = useState(initialForm);
    const [currentRate, setCurrentRate] = useState(83.50);
    const [exchangeRates, setExchangeRates] = useState(defaultExchangeRates);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');

                if (!response.ok) {
                    throw new Error('Failed to fetch rates');
                }

                const data = await response.json();


                const updatedRates = defaultExchangeRates.map(rate => {
                    if (data.rates && data.rates[rate.currency]) {
                        return {
                            ...rate,
                            rate: data.rates[rate.currency].toFixed(2)
                        };
                    }
                    return rate;
                });
                console.log(updatedRates);

                setExchangeRates(updatedRates);

                const selectedRate = updatedRates.find(r => r.currency === formData.currencyFrom);
                if (selectedRate) {
                    setCurrentRate(parseFloat(selectedRate.rate));
                }

                setLastUpdated(new Date().toLocaleTimeString());
                setError(null);
            } catch (err) {
                console.error('Error fetching rates:', err);
                setError('Using default rates. Please refresh for live rates.');
            } finally {
                setLoading(false);
            }
        };

        fetchExchangeRates();
        const interval = setInterval(fetchExchangeRates, 300000);

        return () => clearInterval(interval);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update currency and rate when currency changes
        if (name === 'currencyFrom') {
            const selected = exchangeRates.find(r => r.currency === value);
            if (selected) {
                setCurrentRate(parseFloat(selected.rate));
                if (formData.forexAmount) {
                    const amount = parseFloat(formData.forexAmount);
                    if (!isNaN(amount)) {
                        const converted = amount * parseFloat(selected.rate);
                        setFormData(prev => ({
                            ...prev,
                            [name]: value,
                            indianAmount: converted.toFixed(2)
                        }));
                        return;
                    }
                }
                setFormData(prev => ({ ...prev, [name]: value }));
            }
        } else if (name === 'forexAmount' && value) {
            const amount = parseFloat(value);
            if (!isNaN(amount)) {
                const converted = amount * currentRate;
                setFormData(prev => ({
                    ...prev,
                    [name]: value,
                    indianAmount: converted.toFixed(2)
                }));
            } else {
                setFormData(prev => ({ ...prev, [name]: value }));
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handlePhoneChange = (value) => {
        setFormData(prev => ({ ...prev, phoneNo: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Quote request submitted successfully!");
        setFormData(initialForm);
    };

    const currencyOptions = exchangeRates.map(rate => ({
        _id: rate.currency,
        name: rate.name
    }));

    return (
        <>
            <CommonHeroSection
                title="Money Exchange"
                backgroundImage={MoneyExchangeImg.src}
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Money exchange" || "Destination" },
                ]}
            />

            <MainLayout className="bg-gray-50 py-12">
                <div className="max-w-5xl mx-auto px-5">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="rounded-2xl p-6 md:p-8 mb-8"
                    >
                        <div className="flex items-center justify-between flex-wrap gap-2">
                            <h3 className="text-lg md:text-xl font-bold text-gray-800">
                                Fast, secure, and hassle-free currency exchange at competitive rates
                            </h3>
                            <div className="flex items-center gap-3">
                                {loading && (
                                    <span className="text-xs text-gray-500 animate-pulse">Updating rates...</span>
                                )}
                                {lastUpdated && !loading && (
                                    <span className="text-xs text-gray-400">
                                        Updated: {lastUpdated}
                                    </span>
                                )}
                                {error && (
                                    <span className="text-xs text-amber-500">{error}</span>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white p-6 md:p-8 rounded-xl shadow-xl border border-gray-100 max-w-5xl mx-auto"
                    >
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-5">
                            {exchangeRates.map((rate, index) => (
                                <motion.div
                                    key={rate.currency}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white rounded-xl p-3 text-center shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                                >
                                    <div className="text-sm font-bold text-gray-700">{rate.name}</div>
                                    <div className="text-xs text-gray-500 mt-1">{rate.rate} INR</div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">Get Your Forex Quote</h3>
                                <p className="text-gray-500 text-xs">Enter your currency details and get a quick quote from our forex experts.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="bg-gray-50 p-4 md:p-5 rounded-xl border border-gray-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <FloatingLabelSelect
                                            label="Forex Amount"
                                            name="currencyFrom"
                                            options={currencyOptions}
                                            value={formData.currencyFrom}
                                            onChange={handleChange}
                                            placeholder="Select currency"
                                        />
                                    </div>
                                    <div>
                                        <FloatingLabelSelect
                                            label="Indian Amount"
                                            name="currencyTo"
                                            options={[{ _id: "INR", name: "INR - Indian Rupee" }]}
                                            value={formData.currencyTo}
                                            onChange={handleChange}
                                            placeholder="Select currency"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                                    <div>
                                        <FloatingLabelInput
                                            label="Enter amount"
                                            name="forexAmount"
                                            type="number"
                                            value={formData.forexAmount}
                                            onChange={handleChange}
                                            placeholder="Enter amount"
                                            step="0.01"
                                            min="0"
                                        />
                                    </div>
                                    <div>
                                        <FloatingLabelInput
                                            label="Enter amount"
                                            name="indianAmount"
                                            type="number"
                                            value={formData.indianAmount}
                                            onChange={handleChange}
                                            placeholder="Enter amount"
                                            step="0.01"
                                            min="0"
                                            disabled
                                            className="bg-gray-100 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <div className="text-center mt-3">
                                    <p className="text-xs text-gray-500">
                                        Indicative exchange rate • Final rate confirmed at booking
                                    </p>
                                    <p className="text-xs text-green-600 font-medium mt-1">
                                        1 {formData.currencyFrom} = {currentRate.toFixed(2)} INR
                                    </p>
                                </div>
                            </div>

                            <h4 className="text-sm font-semibold text-gray-700 mb-4">Share your details to view quote</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                                        Mobile Number
                                    </label>
                                    <PhoneInput
                                        country={"in"}
                                        value={formData.phoneNo}
                                        onChange={handlePhoneChange}
                                        inputClass="w-full md:!w-[450px] !pl-12 !py-2.5 !bg-white !border !border-gray-300 !rounded-lg focus:!ring-2 focus:!ring-green-500 focus:!border-transparent !outline-none !text-sm !h-[46px]"
                                        containerClass="!w-full"
                                        buttonClass="!bg-white !border-r !border-gray-300 !rounded-l-lg !h-[46px]"
                                        dropdownClass="!rounded-lg"
                                        placeholder="Enter mobile number"
                                        enableSearch={true}
                                        searchPlaceholder="Search country..."
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email address"
                                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm transition-all duration-200 h-[46px]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="agreeTerms"
                                    className="w-4 h-4 shrink-0 accent-green-600 border-gray-300 rounded focus:ring-green-500"
                                />

                                <label
                                    htmlFor="agreeTerms"
                                    className="text-xs text-gray-600 cursor-pointer"
                                >
                                    I agree to the{" "}
                                    <a
                                        href="/privacy-policy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-red-500 underline"
                                    >
                                        Privacy Policy
                                    </a>{" "}
                                    and{" "}
                                    <a
                                        href="/terms-conditions"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-red-500 underline"
                                    >
                                        Terms & Conditions
                                    </a>
                                    .
                                </label>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                className="w-full bg-primary text-white font-semibold py-3.5 rounded-md shadow-lg hover:bg-green-700 transition-all cursor-pointer text-sm"
                            >
                                GET YOUR QUOTE
                            </motion.button>

                            <p className="text-center text-xs text-gray-500">
                                Our forex expert will contact you shortly.
                            </p>
                        </form>
                    </motion.div>
                </div>
            </MainLayout>
        </>
    );
}

export default MoneyExchangeSection;