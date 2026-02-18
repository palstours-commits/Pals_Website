import { motion } from "framer-motion";
import { useEffect } from "react";

const positionClasses = {
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
};

const typeStyles = {
  info: "border-l-4 border-blue-500",
  success: "border-l-4 border-green-500",
  error: "border-l-4 border-red-500",
  warning: "border-l-4 border-yellow-500",
};

export default function Notification({
  title,
  message,
  phone,
  position = "bottom-right",
  type = "info",
  onClose,
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      className={`fixed z-50 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-2xl max-w-xs
        ${positionClasses[position]}
        ${typeStyles[type]}`}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-start space-x-3">
        <div className="text-2xl">
          {type === "success" && "💬"}
          {type === "error" && "❌"}
          {type === "warning" && "⚠️"}
          {type === "info" && "💬"}
        </div>

        <div>
          {title && (
            <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
          )}
          <p className="text-sm text-gray-600">{message}</p>

          {phone && (
            <p className="text-teal-600 font-semibold mt-1">📞 {phone}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
