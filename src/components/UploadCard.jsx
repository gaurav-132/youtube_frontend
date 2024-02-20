import React, { useState } from 'react'
import UploadModal from './UploadModal';

const UploadCard = () => {

    const [showModal, setShowModal] = useState(0);

    return (
        <div className='bg-[#282828] w-[32%] h-[88%] p-3 rounded-md border border-[rgba(255,255,255,0.1)]'>
            <div className='flex flex-col justify-center items-center px-3 py-2 border-dashed border-[rgba(255,255,255,0.1)] border h-full'>
                <div className=''>
                    <img src="https://www.gstatic.com/youtube/img/creator/no_content_illustration_upload_video_v3_darkmode.svg" alt="" />
                </div>
                <div className='text-sm flex text-center text-[#aaa]'>
                    Want to see metrics on your recent video? Upload and publish a video to get started.
                </div>
                <div className='mt-3'>
                    <button className='uppercase bg-[#3ea6ff] py-1 px-2 text-black rounded-sm' onClick={()=> setShowModal(!showModal)}>Upload Videos</button>
                    {
                        showModal == 1 && <UploadModal showModal={showModal} setShowModal={setShowModal}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default UploadCard;