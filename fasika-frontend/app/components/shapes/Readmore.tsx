import { useState } from "react";

interface ReadMoreListProps {
  items: string[];
  maxItems?: number;
}

const ReadMoreList = ({ items, maxItems = 3 }: ReadMoreListProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine which items to display
  const displayedItems = isExpanded ? items : items.slice(0, maxItems);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        {displayedItems.map((item, index) => (
          <li key={index} className="mb-2">
            {item.trim()}
          </li>
        ))}
      </ul>

      {/* Show "Read More" button only if there are more items than maxItems */}
      {items.length > maxItems && (
        <button
        className="mt-4 w-[100px] h-[29px] px-[8px] py-[4px] rounded-[4px] bg-[#073F27] text-yellow-400 text-sm font-semibold hover:bg-[#073F27]/90 transition-colors"
        onClick={toggleReadMore}
      >
        {isExpanded ? "Read Less" : "Read More"}
      </button>
      )}
    </div>
  );
};

export default ReadMoreList;