import React, { useState } from 'react';

interface StepConfig {
    name: string;
    Component: React.FC<{ formData: FormData; setFormData: React.Dispatch<React.SetStateAction<FormData>>, handleNextStep: any }>;
}

interface FormData { }

interface Props {
    stepsConfig?: StepConfig[];
    currentStep: number;
    isComplete: boolean;
    handleNextStep: () => void;
    formData: object,
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
}



const VideoUploadStepper: React.FC<Props> = ({
    stepsConfig = [],
    currentStep,
    isComplete,
    handleNextStep,
    formData,
    setFormData
}) => {
    if (!stepsConfig.length) {
        return null;
    }

    const nextStep = () => {
        handleNextStep();
    }

    // const [formData, setFormData] = useState<FormData>({});

    // const ActiveComponent = stepsConfig[currentStep - 1]?.Component;

    return (
        <div className='stepper mx-auto w-full max-w-[700px] mb-0'>
            {stepsConfig.map((step, index) => (
                <div key={step.name} className={`step ${currentStep > index + 1 || isComplete ? "complete" : ""} ${currentStep === index + 1 ? 'active' : ''}`}>
                    <div className='step-number'>
                        {currentStep > index + 1 || isComplete ? <span>&#10003;</span> : index + 1}
                    </div>
                    <div className='step-name mt-2 text-xs font-medium text-[#aaaaaa]'>{step.name}</div>
                </div>
            ))}
            {/* Progress Bar Line could go here if implemented in CSS */}
        </div>
    );
};

export default VideoUploadStepper;
