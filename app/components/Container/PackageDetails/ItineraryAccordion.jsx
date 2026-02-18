import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export const ItineraryAccordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items?.map((item, index) => (
        <div
          key={item?._id}
          className="bg-gray-100 rounded-xl overflow-hidden relative"
        >
          <div className="absolute left-0 top-0 h-full w-2 bg-orange-500 rounded-l-xl"></div>
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between 
                       px-6 py-5 text-left"
          >
            <h5 className="text-orange-500 font-semibold text-lg">
              Day {item.title} {item?.location}
            </h5>
            {openIndex === index ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </button>
          {openIndex === index && (
            <div className="px-6 pb-6 text-gray-600 leading-relaxed">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
