import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface SuggestionCarauselProps {
    carauselItems: string[];
}

const SuggestionCarausel: React.FC<SuggestionCarauselProps> = ({ carauselItems }) => {
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const items = ['All', ...carauselItems.filter(i => i !== 'All')];

    return (
        <div className="w-full flex items-center gap-2 py-3 pl-3 pr-4 bg-[#0f0f0f]">
            <div className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <div className="flex items-center space-x-3">
                    {items.length > 0 ? items.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveCategory(item)}
                            className={`px-3.5 h-8 rounded-lg text-sm font-medium transition-colors duration-200 ${activeCategory === item
                                ? 'bg-white text-black'
                                : 'bg-[#272727] text-white hover:bg-[#3f3f3f]'}`}
                        >
                            {item}
                        </button>
                    )) : <div className="text-white">Loading categories...</div>}
                </div>
            </div>
            <button className="w-8 h-8 rounded-full bg-[#0f0f0f] hover:bg-[#272727] text-white shrink-0">
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    );
};

export default SuggestionCarausel;
