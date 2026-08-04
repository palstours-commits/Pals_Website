import { useState } from "react";

export const FloatingLabelInput = ({ label, name, value, onChange, placeholder, required = false, isTextarea = false, type = "text", error, min, max }) => {
    const [isFocused, setIsFocused] = useState(false);
    const isFloating =
        isFocused ||
        (value !== "" && value !== null && value !== undefined);
    return (
        <div className="relative mt-2 w-full">
            {type !== "date" && (
                <label
                    className={`absolute left-3 px-1.5 transition-all duration-200 pointer-events-none z-10 ${isFloating
                            ? "-top-2.5 text-[11px] font-bold text-gray-800 bg-white"
                            : "top-3.5 text-gray-500 text-sm bg-transparent"
                        }`}
                >
                    {label.toUpperCase()} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            {isTextarea ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-500 bg-red-50' : 'border-gray-200'} focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none transition-all resize-none`}
                    rows="3"
                    placeholder={isFocused ? placeholder : ""}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    min={min}
                    max={max}
                    className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-500 bg-red-50' : 'border-gray-200'} focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none transition-all`}
                    placeholder={isFocused ? placeholder : ""}
                />
            )}
            {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
        </div>
    );
};