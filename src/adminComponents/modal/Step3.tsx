import  { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'


interface props {
    formData : object,
    setFormData: Dispatch<SetStateAction<FormData>>;
}

const Step3: React.FC<props> = ({ formData, setFormData }) => {
    const [visiblie, setVisiblie] = useState(false);
    const [showSchedule, setShowSchedule] = useState(false);

    const handleTextInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        console.log(formData)
    }

    const handleClick = () => {
        setVisiblie(!visiblie);
    }

    const handleScheduleVisiblity = () => {
        setShowSchedule(!showSchedule);
    }

    return (
        <div className=''>
            <div className='flex h-[62vh] overflow-y-scroll justify-between'>
                <div className='w-[60%] mt-10 ml-10'>
                    <div className='mb-5    '>
                        <div className='mb-2'>Visiblity</div>
                        <p className='text-sm'>Choose when to publish and who can see your video.</p>
                    </div>
                    <div className='border-2 rounded-md mb-4'>
                        <div className='m-5'>
                            <div className='mb-2 flex justify-between'>
                                <div className='text-left'>
                                    <div>Save or publish</div>
                                    <div className='text-sm'>Make your video public, unlisted or private.</div>
                                </div>
                                <div>
                                    <div className='rounded-full bg-black w-3 h-3' onClick={handleClick}></div>
                                </div>
                            </div>
                            {
                                visiblie &&
                                <div className='text-left'>
                                    <div className='ml-6'>
                                        <div className='mb-4'>
                                            <div>
                                                <input name="visiblity" onChange={handleTextInput} type="radio" value={1}/>&nbsp;&nbsp;Private
                                            </div>
                                            <div className='text-sm'>
                                                Only you and people you choose can see watch your video.
                                            </div>
                                        </div>
                                        <div className='mb-4'>
                                            <div>
                                                <input name='visiblity' onChange={handleTextInput} type="radio" value={2}/>&nbsp;&nbsp;Private
                                            </div>
                                            <div className='text-sm'>
                                                Only you and people you choose can see watch your video.
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <input type="radio" onChange={handleTextInput} name="visiblity" value={3}/>&nbsp;&nbsp;Private
                                            </div>
                                            <div className='text-sm'>
                                                Only you and people you choose can see watch your video.
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            }
                        </div>

                        <div className=''>

                        </div>
                    </div>

                    <div className='border-2 rounded-md mb-4'>
                        <div className='m-5'>
                            <div className='mb-2 flex justify-between'>
                                <div className='text-left'>
                                    <div>Schedule</div>
                                    <div className='text-sm'>Select a date to make your video public.</div>
                                </div>
                                <div>
                                    <div className='rounded-full bg-black w-3 h-3' onClick={handleScheduleVisiblity}></div>
                                </div>
                            </div>
                            {
                                showSchedule &&
                                <div className='text-left'>
                                    <div className='ml-6 mb-4'>
                                        <div className='text-sm'>
                                            Schedule as public    
                                        </div>
                                        <div className='flex mt-4'>
                                            <div className='mr-10'>
                                                <input onChange={handleTextInput} className='focus:outline-none bg-[#282828] border-2 rounded-md p-3' type="date" name="scheduleDate"/>
                                            </div>
                                            <div>
                                                <input onChange={handleTextInput} className='focus:outline-none bg-[#282828] border-2 rounded-md p-3' type="time" name="scheduleTime"/>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            }
                        </div>

                        <div className=''>

                        </div>
                    </div>
                </div>
                <div className='w-[40%]'>
                    <div className='w-[90%] mx-4 mt-[85px] h-50 border-2 border-dashed'>
                    </div>
                    <video></video>
                </div>
            </div>
        </div>
    )
}

export default Step3