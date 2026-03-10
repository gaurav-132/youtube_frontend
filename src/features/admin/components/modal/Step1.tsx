import React, { useState, useRef, ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpLong } from '@fortawesome/free-solid-svg-icons';
import { BACKEND_URL } from '../../../../utils/constant';

interface FormData {
    videoFile: File | null;
    uploadedFile: string | null;
}

interface Props {
    formData: FormData;
    setFormData: Dispatch<SetStateAction<FormData>>;
    handleNextStep: () => void;
}

const Step1: React.FC<Props> = ({ formData, setFormData, handleNextStep }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0];
            setFormData(prevState => ({
                ...prevState,
                videoFile: selectedFile
            }));
            handleNextStep();

            // uploadVideoOnServer();
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };



    return (
        <div className='w-full h-full flex flex-col items-center justify-center animate-fadeIn' onDragOver={(e) => e.preventDefault()}>
            <input
                type="file"
                onChange={handleFileInputChange}
                accept="video/*"
                className="hidden"
                ref={fileInputRef}
            />

            <div
                className='w-32 h-32 bg-[#1f1f1f] rounded-full flex items-center justify-center mb-6 cursor-pointer hover:bg-[#303030] transition-colors'
                onClick={handleButtonClick}
            >
                <div className="text-[#909090]">
                    <FontAwesomeIcon icon={faUpLong} fontSize={40} />
                </div>
            </div>

            <h2 className='text-white text-[15px] font-medium mb-1'>Drag and drop video files to upload</h2>
            <p className='text-[#aaaaaa] text-[13px] mb-6'>Your videos will be private until you publish them.</p>

            <button
                type='button'
                className="bg-[#3ea6ff] text-[#0f0f0f] text-sm font-medium px-4 py-2.5 rounded-sm uppercase hover:bg-[#65b8ff] transition-colors"
                onClick={handleButtonClick}
            >
                Select Files
            </button>

            <div className='mt-16 text-center'>
                <p className='text-[#aaaaaa] text-xs'>
                    By submitting your videos to YouTube, you acknowledge that you agree to YouTube's Terms of Service and Community Guidelines.
                </p>
                <p className='text-[#aaaaaa] text-xs mt-2'>
                    Please be sure not to violate others' copyright or privacy rights. Learn more
                </p>
            </div>
        </div>
    );
};

export default Step1;
