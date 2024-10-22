import React, { SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../features/adminSlice.js';

import Step1 from './modal/Step1';
import Step2 from './modal/Step2';
import Step3 from './modal/Step3';
import VideoUploadStepper from './VideoUploadStepper';
import { Dispatch } from '@reduxjs/toolkit';
import { BACKEND_URL } from '../utils/constant.js';

interface StepConfig {
    name: string;
    Component: React.FC<any>;
}

interface prop {
    formData: object
}

const Modal = () => {
    const [step, setStep] = useState<number>(1);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [formData, setFormData] = useState<object>({});

    const dispatch = useDispatch();

    const handleNextStep = () => {
        setStep((prevState) => {
            if (prevState === CHECKOUT_STEPS.length) {
                setIsComplete(true);
                return prevState;
            } else {
                return prevState + 1;
            }
        })
    };

    const handleBack = () => {
        setStep((prevState) => prevState - 1)
    };

    const CHECKOUT_STEPS: StepConfig[] = [
        {
            name: 'Video Upload',
            Component: Step1
        },
        {
            name: 'Details',
            Component: Step2
        },
        {
            name: "Visibility",
            Component: Step3
        }
    ]

    
    const URI = BACKEND_URL + '/api/v1/videos/upload-video';

    const handleSubmit = async () => {
        const accessToken = localStorage.getItem("accessToken");
        const newFormData = new FormData();

        newFormData.append('videoFile', formData.videoFile);
        newFormData.append('title', formData.title);
        newFormData.append('description', formData.description);
        newFormData.append('thumbnailFile', formData.thumbnailFile);
        newFormData.append('playlist', formData.playlist);
        newFormData.append('audience', formData.audience);
        newFormData.append('visiblity', formData.visiblity);
        newFormData.append('scheduleDate', formData.scheduleDate);
        newFormData.append('scheduleTime', formData.scheduleTime);
        
        try {
            const response = await fetch(URI, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: newFormData,
            });

            const data = await response.json();
            
            
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };


    const handleClose = () => {
        dispatch(closeModal());
    }

    return (
        <div className='fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='modal-bg w-[80vw] h-[85vh] overflow-hidden rounded-lg'>
                <div className='flex justify-between px-4 pt-4 border-b-2'>
                    <div className='text-xl font-semibold'>Upload Video</div>
                    <div>
                        <button className='text-gray-500 hover:text-white focus:outline-none' onClick={handleClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className='flex flex-wrap mx-auto my-3 h-[420px] w-full text-center'>
                    <VideoUploadStepper
                        stepsConfig={CHECKOUT_STEPS}
                        currentStep={step}
                        isComplete={isComplete}
                        formData={formData}
                        setFormData={setFormData}
                        handleNextStep={handleNextStep}
                    />
                </div>
                <div className='text-right h-[24px] bg-[#282828] w-full py-3 rounded-b-lg flex justify-end items-center add-calss'>
                    {step !== 1 && (
                        <button className='bg-blue-500 text-white px-4 py-1 mr-3 rounded-md hover:bg-blue-600' onClick={handleBack}>
                            Back
                        </button>
                    )}
                    {!isComplete && step !== 1 && (
                        <div>
                            <button className='bg-blue-500 text-white px-4 py-1 mr-3 rounded-md hover:bg-blue-600' onClick={handleNextStep}>
                                Next
                            </button>

                        </div>
                    )}

                    {step === CHECKOUT_STEPS.length && (
                        <button className='bg-blue-500 text-white px-4 py-1 mr-3 rounded-md hover:bg-blue-600' onClick={handleSubmit}>
                            Submit
                        </button>
                    )}              
                </div>

            </div>
        </div>
    )
};

export default Modal;
