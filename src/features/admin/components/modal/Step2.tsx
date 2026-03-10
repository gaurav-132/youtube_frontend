import React, { useRef, Dispatch, ChangeEvent, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
// import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface FormData {
    title: string;
    description: string;
    thumbnailFile: File | null;
    thumbnailUploadedUrl: string | null;
    playlist: boolean;
    audience: number;
    videoFile?: File | null;
}

interface Props {
    formData: FormData;
    setFormData: Dispatch<SetStateAction<FormData>>;
}

const Step2: React.FC<Props> = ({ formData, setFormData }) => {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleTextInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0];
            setFormData(prevState => ({
                ...prevState,
                thumbnailFile: selectedFile
            }));
        }
    };

    return (
        <div className='flex gap-6 h-full animate-fadeIn'>
            {/* Left Column: Form Fields */}
            <div className='flex-1 lg:w-[60%] overflow-y-auto pr-2 custom-scrollbar'>

                <h3 className='text-2xl font-bold mb-6 text-white'>Details</h3>

                <div className='space-y-6'>

                    {/* Title Input */}
                    <div className="relative border border-[#505050] rounded-lg p-3 focus-within:border-[#3ea6ff] transition-colors bg-[#0f0f0f]/5">
                        <label className="text-xs text-[#aaaaaa] block mb-1">Title (required)</label>
                        <input
                            name='title'
                            value={formData.title || ''}
                            onChange={handleTextInput}
                            type="text"
                            className='w-full bg-transparent text-white focus:outline-none text-sm placeholder-[#aaaaaa]'
                            placeholder="Add a title that describes your video"
                        />
                    </div>

                    {/* Description Input */}
                    <div className="relative border border-[#505050] rounded-lg p-3 focus-within:border-[#3ea6ff] transition-colors bg-[#0f0f0f]/5">
                        <label className="text-xs text-[#aaaaaa] block mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description || ''}
                            onChange={handleTextInput}
                            rows={5}
                            className='w-full bg-transparent text-white focus:outline-none text-sm resize-none custom-scrollbar placeholder-[#aaaaaa]'
                            placeholder="Tell viewers about your video"
                        />
                    </div>

                    {/* Thumbnail Section */}
                    <div>
                        <label className='block text-base font-medium mb-1 text-white'>Thumbnail</label>
                        <p className='text-[#aaaaaa] text-xs mb-3'>Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws viewers' attention.</p>

                        <div className='flex gap-4' onClick={handleButtonClick}>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                                name='thumbnail'
                                ref={fileInputRef}
                            />
                            {/* Upload Box */}
                            <div className='w-32 h-20 border border-dashed border-[#505050] rounded-sm flex flex-col items-center justify-center cursor-pointer hover:bg-[#303030] hover:border-[#aaaaaa] transition-all bg-[#1f1f1f]'>
                                <div className="text-[#aaaaaa] mb-1">
                                    <FontAwesomeIcon icon={faImage} />
                                </div>
                                <span className='text-[10px] text-[#aaaaaa]'>Upload file</span>
                            </div>

                            {/* Preview Selected Thumbnail if exists */}
                            {formData.thumbnailFile && (
                                <div className='w-32 h-20 rounded-sm overflow-hidden relative'>
                                    <img
                                        src={URL.createObjectURL(formData.thumbnailFile)}
                                        alt="Thumbnail Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            {/* Auto-generated thumbnails placeholders (static for now) */}
                            <div className='w-32 h-20 bg-[#1f1f1f] rounded-sm flex items-center justify-center text-[#aaaaaa] text-[10px]'>
                                Generating...
                            </div>
                            <div className='w-32 h-20 bg-[#1f1f1f] rounded-sm flex items-center justify-center text-[#aaaaaa] text-[10px]'>
                                Generating...
                            </div>
                        </div>
                    </div>

                    {/* Playlist (Simplified) */}
                    <div>
                        <label className='block text-base font-medium mb-1 text-white'>Playlists</label>
                        <div className="relative">
                            <select
                                onChange={handleTextInput}
                                name="playlist"
                                className='w-full bg-[#1f1f1f] border border-[#505050] text-[#aaaaaa] text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#3ea6ff] appearance-none'
                            >
                                <option value="" disabled selected>Select</option>
                                <option value={1}>Yes</option>
                                <option value={0}>No</option>
                            </select>
                            {/* <div className="absolute right-3 top-2.5 text-[#aaaaaa] pointer-events-none">
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div> */}
                        </div>
                    </div>

                    {/* Audience Section */}
                    <div>
                        <label className='block text-base font-medium mb-1 text-white'>Audience</label>
                        <p className='text-[#aaaaaa] text-sm mb-3'>
                            Is this video made for kids? (required)
                            <span className="text-blue-400 cursor-pointer ml-1 text-xs">What's content made for kids?</span>
                        </p>

                        <div className="bg-[#1f1f1f] border border-[#505050] rounded-lg p-4 space-y-3">
                            <div>
                                <h4 className="font-medium text-sm mb-2 text-white">Features like personalized ads and notifications won't be available on videos made for kids. Videos that are set as made for kids by you are more likely to be recommended alongside other kids' videos.</h4>
                            </div>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    name="audience"
                                    value={1}
                                    type="radio"
                                    onChange={handleTextInput}
                                    className="accent-[#3ea6ff]"
                                    checked={Number(formData.audience) === 1}
                                />
                                <span className="text-sm">Yes, it's made for kids</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    name="audience"
                                    type="radio"
                                    value={0}
                                    onChange={handleTextInput}
                                    className="accent-[#3ea6ff]"
                                    checked={Number(formData.audience) === 0}
                                />
                                <span className="text-sm">No, it's not made for kids</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Video Preview Card */}
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

export default Step2;