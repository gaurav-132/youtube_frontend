import React, { useState } from 'react'

const SuggestionCarausel = ({carauselItems}) => {
    const [isActive, setIsActive] = useState(true);
  return (
    <div className='ml-6 flex'>
        {carauselItems && carauselItems.length > 0 ? (
            carauselItems.map((item, index) => (
                <div key={index} className={`hover:common-bg mr-4 cursor-pointer rounded-md ${index !== 0 ? 'common-bg':'is-active'}`}>
                    <div className='px-[14px] py-[6px] text-sm font-medium'>{item}</div>
                </div>
            ))
        ) : (
            <p>No items to display</p>
        )}
    </div>
  )
}

export default SuggestionCarausel