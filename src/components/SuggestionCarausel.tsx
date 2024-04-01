import React, { useState } from 'react';

interface SuggestionCarauselProps {
    carauselItems: string[];
}

const SuggestionCarausel: React.FC<SuggestionCarauselProps> = ({ carauselItems }) => {
    const [isActive, setIsActive] = useState<boolean>(true);

    return (
        <div className='ml-6 flex'>
            {carauselItems && carauselItems.length > 0 ? (
                carauselItems.map((item, index) => (
                    <div key={index} className={`hover:common-bg mr-4 cursor-pointer rounded-md ${index !== 0 ? 'common-bg' : isActive ? 'is-active' : ''}`}>
                        <div className='px-[14px] py-[6px] text-sm font-medium'>{item}</div>
                    </div>
                ))
            ) : (
                <p>No items to display</p>
            )}
        </div>
    );
};

export default SuggestionCarausel;
