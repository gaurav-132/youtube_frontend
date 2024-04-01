import React, { useState, useRef, ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpLong } from '@fortawesome/free-solid-svg-icons';
import { BACKEND_URL } from '../../utils/constant';

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

    const URI = BACKEND_URL + '/api/v1/videos/upload-video-local';

    const uploadVideoOnServer = async () => {
        if (!formData.videoFile) {
            console.error('No file selected for upload');
            return;
        }

        try {
            const videoFormData = new FormData();
            videoFormData.append('videoFile', formData.videoFile);

            const response = await fetch(URI, {
                method: 'POST',
                body: videoFormData,
            });

            const data = await response.json();
            
            if(response){
                setFormData(prevstate => ({...prevstate, uploadedFile : data?.data?.url}));
                handleNextStep();
            }

            
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };




    return (
        <div className='space-y-4' onDragOver={(e) => e.preventDefault()}>
            <div className='flex-1 h-auto justify-center items-center w-full text-center'>
                <div className='flex flex-col justify-center items-center min-h-[370px]'>
                    <div className='my-4'>
                        <div className='px-[40px] py-[36px] flex justify-center items-center bg-[#1f1f1f] rounded-full'>
                            <FontAwesomeIcon icon={faUpLong} fontSize={21} />
                        </div>
                    </div>
                    <label className="file-input-label">
                        <input
                            type="file"
                            onChange={handleFileInputChange}
                            accept="video/*"
                            className="hidden"
                            ref={fileInputRef}
                        />
                        <button
                            type='button'
                            className="file-input-button"
                            onClick={handleButtonClick}
                        >
                            Select Video File
                        </button>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Step1;
