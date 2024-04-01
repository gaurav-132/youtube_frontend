import React, { useState } from 'react'

const Step1 = () => {
    const [formData, setFormData] = useState({});
    const handleInputChange = () => {}
    return (
        <div>
            <div className='border-dashed border-2 border-gray-400 p-4'>
                <p className='text-center mb-2'>Drag & drop video file here or click to upload</p>
                <input
                    type='file'
                    onChange={(e) => handleFileInputChange(e,'videoFile')}
                    className=''
                    accept='video/*'
                />
            </div>
            <div className='border-dashed border-2 border-gray-400  p-4'>
                <p className='text-center mb-2'>Drag & drop thumbnail file here or click to upload</p>
                <input
                    type='file'
                    onChange={(e) => handleFileInputChange(e, 'thumbnail')}
                    className=''
                    accept='image/*'
                />
            </div>
            <div>
                <label htmlFor='title' className='block mb-1'>Title:</label>
                <input
                    type='text'
                    id='title'
                    name='title'
                    value={formData.title}
                    onChange={handleInputChange}
                    className='w-full text-black border border-gray-400 rounded-md px-3 py-1'
                />
            </div>
            <div>
                <label htmlFor='description' className='block mb-1'>Description:</label>
                <textarea
                    id='description'
                    name='description'
                    value={formData.description}
                    onChange={handleInputChange}
                    className='w-full border text-black border-gray-400 rounded-md px-3 py-1'
                    rows='2'
                />
            </div>
            <div className='flex justify-end'>
                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>Upload</button>
            </div>
        </div>
    )
}

export default Step1