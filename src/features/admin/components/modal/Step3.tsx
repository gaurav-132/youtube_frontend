import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

interface FormData {
    title: string;
    description: string;
    thumbnailFile: File | null;
    thumbnailUploadedUrl: string | null;
    playlist: boolean;
    audience: number;
    videoFile?: File | null;
    visibility: string;
    scheduleDate: string;
    scheduleTime: string;
}

interface Props {
    formData: FormData;
    setFormData: Dispatch<SetStateAction<FormData>>;
}

const Step3: React.FC<Props> = ({ formData, setFormData }) => {
    const [showSchedule, setShowSchedule] = useState(false);

    const handleTextInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleVisibilityChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData(prevState => ({
            ...prevState,
            visibility: value
        }));
        if (value !== 'schedule') {
            setShowSchedule(false);
        }
    };

    const toggleSchedule = () => {
        setShowSchedule(!showSchedule);
        if (!showSchedule) {
            setFormData(prevState => ({
                ...prevState,
                visibility: 'schedule'
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                visibility: 'public' // Default back to public or previous state
            }));
        }
    }

    return (
        <div className='flex gap-6 h-full animate-fadeIn'>
            {/* Left Column: Form Fields */}
            <div className='flex-1 lg:w-[60%] overflow-y-auto pr-2 custom-scrollbar'>
                <h3 className='text-2xl font-bold mb-6 text-white'>Visibility</h3>

                <div className='space-y-4'>
                    <div className='bg-[#1f1f1f] border border-[#505050] rounded-lg p-6'>
                        <h4 className='text-white font-medium mb-1'>Save or publish</h4>
                        <p className='text-[#aaaaaa] text-sm mb-4'>Make your video public, unlisted, or private</p>

                        <div className='space-y-3 pl-2'>

                            {/* Private */}
                            <label className='flex items-start gap-3 cursor-pointer group'>
                                <div className='mt-0.5'>
                                    <input
                                        type="radio"
                                        name="visibility"
                                        value="private"
                                        checked={formData.visibility === 'private'}
                                        onChange={handleVisibilityChange}
                                        className='accent-[#3ea6ff]'
                                    />
                                </div>
                                <div>
                                    <span className='block text-sm font-medium text-white group-hover:text-[#3ea6ff] transition-colors'>Private</span>
                                    <span className='block text-xs text-[#aaaaaa]'>Only you and people you choose can watch your video</span>
                                </div>
                            </label>

                            {/* Unlisted */}
                            <label className='flex items-start gap-3 cursor-pointer group'>
                                <div className='mt-0.5'>
                                    <input
                                        type="radio"
                                        name="visibility"
                                        value="unlisted"
                                        checked={formData.visibility === 'unlisted'}
                                        onChange={handleVisibilityChange}
                                        className='accent-[#3ea6ff]'
                                    />
                                </div>
                                <div>
                                    <span className='block text-sm font-medium text-white group-hover:text-[#3ea6ff] transition-colors'>Unlisted</span>
                                    <span className='block text-xs text-[#aaaaaa]'>Anyone with the video link can watch your video</span>
                                </div>
                            </label>

                            {/* Public */}
                            <label className='flex items-start gap-3 cursor-pointer group'>
                                <div className='mt-0.5'>
                                    <input
                                        type="radio"
                                        name="visibility"
                                        value="public"
                                        checked={formData.visibility === 'public'}
                                        onChange={handleVisibilityChange}
                                        className='accent-[#3ea6ff]'
                                    />
                                </div>
                                <div>
                                    <span className='block text-sm font-medium text-white group-hover:text-[#3ea6ff] transition-colors'>Public</span>
                                    <span className='block text-xs text-[#aaaaaa]'>Everyone can watch your video</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Schedule Section */}
                    <div className='bg-[#1f1f1f] border border-[#505050] rounded-lg overflow-hidden'>
                        <div
                            className='p-6 cursor-pointer hover:bg-[#2a2a2a] transition-colors'
                            onClick={toggleSchedule}
                        >
                            <h4 className='text-white font-medium mb-1'>Schedule</h4>
                            <p className='text-[#aaaaaa] text-sm'>Select a date to make your video public</p>
                        </div>

                        {/* Schedule Form */}
                        {showSchedule && (
                            <div className='px-6 pb-6 animate-fadeIn'>
                                <div className='pl-2'>
                                    <label className='flex items-start gap-3 cursor-pointer group mb-4'>
                                        <div className='mt-0.5'>
                                            <input
                                                type="radio"
                                                name="visibility"
                                                value="schedule"
                                                checked={true}
                                                readOnly
                                                className='accent-[#3ea6ff]'
                                            />
                                        </div>
                                        <div>
                                            <span className='block text-sm font-medium text-white'>Schedule as public</span>
                                        </div>
                                    </label>

                                    <div className='flex gap-4 ml-6'>
                                        <div className='flex flex-col'>
                                            <label className='text-xs text-[#aaaaaa] mb-1 font-medium'>Date</label>
                                            <input
                                                type="date"
                                                name="scheduleDate"
                                                value={formData.scheduleDate || ''}
                                                onChange={handleTextInput}
                                                className='bg-[#121212] border border-[#505050] text-white text-sm rounded px-3 py-2 w-40 focus:outline-none focus:border-[#3ea6ff]'
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <label className='text-xs text-[#aaaaaa] mb-1 font-medium'>Time</label>
                                            <input
                                                type="time"
                                                name="scheduleTime"
                                                value={formData.scheduleTime || ''}
                                                onChange={handleTextInput}
                                                className='bg-[#121212] border border-[#505050] text-white text-sm rounded px-3 py-2 w-32 focus:outline-none focus:border-[#3ea6ff]'
                                            />
                                        </div>
                                    </div>
                                    <p className='text-xs text-[#aaaaaa] mt-4 ml-6'>
                                        Video will be private before publishing.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Important Info Box */}
                    <div className='bg-[#0f0f0f] rounded p-4'>
                        <h5 className='text-xs font-bold text-[#aaaaaa] mb-1'>Before you publish, check the following:</h5>
                        <p className='text-xs text-[#aaaaaa]'>
                            Do children appear in this video? Make sure you follow our policies to protect minors from harm, exploitation, bullying, and violations of labor law. <a href="#" className='text-[#3ea6ff] hover:underline'>Learn more</a>
                        </p>
                        <p className='text-xs text-[#aaaaaa] mt-2'>
                            Looking for overall content guidance? Our Community Guidelines can help you avoid trouble and ensure that YouTube remains a safe and vibrant community. <a href="#" className='text-[#3ea6ff] hover:underline'>Learn more</a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Column: Video Preview Card (Reused layout) */}
            <div className='hidden lg:block w-[300px] flex-shrink-0'>
                <div className='sticky top-0'>
                    <div className='bg-[#1f1f1f] rounded-lg overflow-hidden border border-[#3e3e3e]'>
                        {/* Video Player Placeholder area */}
                        <div className='w-full aspect-video bg-black flex items-center justify-center'>
                            {formData.videoFile ? (
                                <video
                                    src={URL.createObjectURL(formData.videoFile)}
                                    className="w-full h-full object-contain"
                                    controls
                                />
                            ) : (
                                <span className="text-[#aaaaaa] text-xs">Video Preview</span>
                            )}
                        </div>

                        <div className='p-4'>
                            <div className='mb-4'>
                                <span className='text-xs text-[#aaaaaa] block mb-1'>Video Link</span>
                                <a href="#" className='text-[#3ea6ff] text-sm block truncate'>https://youtu.be/example123</a>
                            </div>

                            <div className='mb-4'>
                                <span className='text-xs text-[#aaaaaa] block mb-1'>Filename</span>
                                <div className='text-white text-sm truncate'>{formData.videoFile?.name || 'video_filename.mp4'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step3;