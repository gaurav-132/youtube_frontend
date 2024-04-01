import  { useRef, Dispatch, ChangeEvent ,SetStateAction } from 'react'

interface FormData {
    title: string,
    description: string,
    thumbnailFile: File,
    thumbnailUploadedUrl: string,
    playlist: boolean,
    audience: number
}

interface props {
    formData: FormData,
    setFormData: Dispatch<SetStateAction<FormData>>;
}


const Step2: React.FC<props> = ({ formData, setFormData }) => {

    const fileInputRef = useRef<HTMLInputElement>(null);


    const handleTextInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        console.log(formData)
    }

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }
    
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            const selectedFile = e.target.files[0];
            setFormData(prevState => ({
                ...prevState,
                thumbnailFile: selectedFile
            }));
        }
    }

    return (
    <div>
        <div className='flex flex-wrap flex-col justify-between h-[55vh] overflow-y-scroll w-full'>
            <div  className='w-[60%] ml-10 mt-10'>
                <div className='flex justify-between'>
                    <div className='text-xl'>Details</div>
                    <div className='text-lg text-blue-500'>Result Details</div>
                </div>
                <div className='mt-4 border-2 focus:outline-blue-500 flex flex-col p-2 rounded-lg'>
                    <label className='text-left'>Title</label>
                    <input name='title' onChange={handleTextInput} type="text" className='bg-[#282828] border-none focus:outline-none' />
                </div>
                <div className='mt-5 border-2 focus:outline-blue-500 flex flex-col p-2 rounded-lg'>
                    <label className='text-left'>Description</label>
                    <textarea name="description" onChange={handleTextInput} cols={5} className='bg-[#282828] border-none focus:outline-none' rows={5}></textarea>
                </div>
                <div className='my-5 text-left'>
                    <label htmlFor="">Thumbnail</label>
                    <p className='text-[#aaa] text-sm'>Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws viewers' attention.</p>
                    <div className='flex mt-4' onClick={handleButtonClick}>
                        <div className='border-2 cursor-pointer border-dashed rounded-md py-5 px-2 flex items-center'>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                            name='thumbnail'
                            ref={fileInputRef}
                        />
                        Upload Thumbnail
                        </div>
                    </div>
                </div>
                <div className='my-5 text-left'>
                    <label htmlFor="">Playlist</label>
                    <p className='text-[#aaa] text-sm'>Add your video to one or more playlists to organize your content for viewers.</p>
                    <select onChange={handleTextInput} name="playlist" className='bg-[#282828] focus:outline-none border-2 w-[45%] py-4 px-2 rounded-md mt-4'>
                        <option value={1}>Yes</option>
                        <option value={0}>No</option>
                    </select>
                </div>
                <div className='py-5 text-left'>
                    <label htmlFor="">Audience</label>
                    <p className='text-[#aaa]'>Is this video made for kids? (required)</p>
                    <div>
                        <input name="audience" value={1} type="radio" onChange={handleTextInput} id="" />&nbsp;&nbsp;Yes
                    </div>
                    <div className='mb-5'>
                        <input name="audience" type="radio" value={0} onChange={handleTextInput} id="" />&nbsp;&nbsp;No
                    </div>
                </div>
            </div>
            <div className='w-[30%]'>
                <div className='w-[90%] mx-4 mt-[85px] h-50 border-2 border-dashed'>
                </div>
                <video></video>
            </div>
        </div>
    </div>
    )
}

export default Step2