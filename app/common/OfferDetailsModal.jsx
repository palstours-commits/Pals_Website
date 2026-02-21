export const OfferDetailsModal = ({ open, onClose, offer }) => {
  if (!open || !offer) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-lg w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        <span className="bg-[#2CB3DB] text-white text-xs px-4 py-1 rounded-full inline-block mb-3">
          {offer.offerCategory}
        </span>
        <h4 className="text-xl font-bold mb-3">{offer.offerName}</h4>
        <p className="text-gray-600 text-sm mb-6">{offer.description}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
