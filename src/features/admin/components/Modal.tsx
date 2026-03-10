import React, { SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../store/adminSlice.js';

import Step1 from './modal/Step1';
import Step2 from './modal/Step2';
import Step3 from './modal/Step3';
import VideoUploadStepper from './VideoUploadStepper';
import { Dispatch } from '@reduxjs/toolkit';
import { BACKEND_URL } from '../../../utils/constant.js';

interface StepConfig {
    name: string;
    Component: React.FC<any>;
}

interface prop {
    formData: any
}

const Modal = () => {
    const [step, setStep] = useState<number>(1);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [formData, setFormData] = useState<any>({});

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
        console.log("je")
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
        <div className='fixed top-0 left-0 z-50 w-full h-full bg-black/60 flex justify-center items-center font-roboto'>
            <div className='bg-[#282828] w-full max-w-[960px] h-[90vh] mx-4 rounded-xl flex flex-col shadow-2xl relative animate-fadeIn max-h-[90vh]'>

                {/* Header */}
                <div className='flex justify-between items-center px-6 py-4 border-b border-[#3e3e3e] flex-shrink-0'>
                    <div className='text-xl font-semibold text-white'>
                        {step === 1 ? 'Upload videos' : formData.title || 'Draft'}
                    </div>
                    <div className='flex items-center gap-4'>
                        <button className='text-[#aaaaaa] hover:text-white transition-colors'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        </button>
                        <button className='text-[#aaaaaa] hover:text-white transition-colors' onClick={handleClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Stepper (Only visible after step 1) */}
                {step > 1 && (
                    <div className='px-12 pt-6 pb-2 flex-shrink-0'>
                        {/* You might want to pass formatting to VideoUploadStepper to match YouTube's circular stepper */}
                        <VideoUploadStepper
                            stepsConfig={CHECKOUT_STEPS}
                            currentStep={step}
                            isComplete={isComplete}
                            formData={formData}
                            setFormData={setFormData}
                            handleNextStep={handleNextStep}
                        />
                    </div>
                )}


                {/* Content Body */}
                <div className='flex-1 overflow-y-auto custom-scrollbar relative'>
                    {step === 1 ? (
                        <Step1
                            formData={formData}
                            setFormData={setFormData}
                            handleNextStep={handleNextStep}
                        />
                    ) : (
                        <div className="px-12 py-6">
                            {/* Render active step component */}
                            {CHECKOUT_STEPS.map((s, index) => {
                                if (index + 1 === step) {
                                    const Component = s.Component;
                                    return <Component key={index} formData={formData} setFormData={setFormData} />;
                                }
                                return null;
                            })}
                        </div>
                    )}
                </div>

                {/* Footer (Hidden on Step 1 as Step 1 usually has its own flow or is just the upload zone) */}
                {step !== 1 && (
                    <div className='border-t border-[#3e3e3e] px-6 py-4 flex justify-between items-center bg-[#282828] rounded-b-xl'>
                        {/* Left side usually has upload status */}
                        <div className="text-xs text-[#aaaaaa]">
                            {/* Upload status placeholder */}
                            Checks complete. No issues found.
                        </div>

                        <div className='flex items-center gap-2'>
                            <button
                                className='text-sm font-medium text-[#3ea6ff] hover:bg-[#3ea6ff]/10 px-4 py-2 rounded-sm uppercase transition-colors'
                                onClick={handleBack}
                            >
                                Back
                            </button>

                            {step === CHECKOUT_STEPS.length ? (
                                <button
                                    className='bg-[#3ea6ff] text-black text-sm font-medium px-4 py-2 rounded-sm uppercase hover:bg-[#65b8ff] transition-colors'
                                    onClick={handleSubmit}
                                >
                                    Publish
                                </button>
                            ) : (
                                <button
                                    className='bg-[#3ea6ff] text-black text-sm font-medium px-4 py-2 rounded-sm uppercase hover:bg-[#65b8ff] transition-colors'
                                    onClick={handleNextStep}
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
};

export default Modal;
