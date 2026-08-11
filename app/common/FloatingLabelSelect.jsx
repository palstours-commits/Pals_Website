import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const FloatingLabelSelect = ({ label, isLabel = true, name, value, onChange, options = [], placeholder, required = false, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find(opt => opt._id === value);
    return (
        <div className="relative mb-6 mt-1 w-full">
            {
                isLabel &&
                <label className="absolute -top-2.5 left-3 px-1.5 text-xs font-semibold text-gray-700 bg-white z-10">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            }

            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-4 py-3.5 text-sm rounded-xl border ${error ? 'border-red-500 bg-red-50' : 'border-gray-200'} cursor-pointer flex justify-between items-center bg-white hover:border-red-600 transition-all`}
            >
                <span className={value ? "text-gray-900" : "text-gray-400"}>{selectedOption ? selectedOption.name : placeholder}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={`transition-transform ${isOpen ? 'rotate-180 text-red-600' : 'text-gray-400'}`}>
                    <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-1 max-h-60 overflow-y-auto">
                        {options.map(opt => (
                            <div
                                key={opt._id}
                                className="px-4 py-2.5 hover:bg-red-50 rounded-lg cursor-pointer text-sm transition-all"
                                onClick={() => { onChange({ target: { name, value: opt._id } }); setIsOpen(false); }}
                            >
                                {opt.name}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};