import React, { useState } from 'react';

interface SuggestionCarauselProps {
    carauselItems: string[];
}

const SuggestionCarausel: React.FC<SuggestionCarauselProps> = ({ carauselItems }) => {
    const [activeCategory, setActiveCategory] = useState<string>("All");

    // Add "All" to the beginning if not present, ideally handles in parent but safety here
    const items = ["All", ...carauselItems.filter(i => i !== "All")];

    return (
        <div className='w-full overflow-x-auto whitespace-nowrap scrollbar-hide py-3 px-4 sticky top-[56px] bg-[#0f0f0f] z-10' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex space-x-3">
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveCategory(item)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 
                                ${activeCategory === item
                                    ? 'bg-white text-black'
                                    : 'bg-[#272727] text-white hover:bg-[#3f3f3f]'}`}
                        >
                            {item}
                        </button>
                    ))
                ) : (
                    <div className="text-white">Loading categories...</div>
                )}
            </div>
        </div>
    );
};

export default SuggestionCarausel;
