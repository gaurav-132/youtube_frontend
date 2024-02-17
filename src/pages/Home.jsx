import React, { useEffect, useState } from 'react';



const Home = ({ backendUrl, headerObj }) => {

    const [videos, setVideos] = useState([]);

    const VIDEO_URL = backendUrl+'/api/youtube/get-videos';


    const getVideos = async () => {
        const response = await fetch(VIDEO_URL, headerObj);
        const data = await response.json();
        console.log(data.videos.data);
        setVideos(data?.videos?.data);  
    }

    useEffect(()=>{
        getVideos();

    }, [])

    return (
    <div className='mx-6'>
        <div className='flex flex-wrap justify-between '>
            {videos?.map((video, index)=>{
                return(
                    <div key={index} className='bg-red-600  mt-3  w-[30%] max-w-[500px] rounded-md'>
                        <a className='cursor-pointer'>
                            <div>
                                <img src={video.thumbnailUrl} className='object-cover'/>
                            </div>
                        </a>
                    </div>
                )
            })}
        </div>
    </div>
      
    );
};

export default Home;
