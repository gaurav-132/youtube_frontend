import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BACKEND_URL as backendUrl } from '../utils/constant';
import { HEADER_OBJ as headerObj } from '../utils/constant';

interface Video {
    thumbnailUrl: string;
    title: string;
    author: string;
}


const Home: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);

    const VIDEO_URL = `${backendUrl}/api/youtube/get-videos`;

    const getVideos = async () => {
        const response = await fetch(VIDEO_URL, headerObj);
        const data = await response.json();
        console.log(data.videos.data);
        setVideos(data?.videos?.data);  
    }

    useEffect(() => {
        getVideos();
    }, []);

    return (
        <div className='mx-6'>
            <div className='flex flex-wrap justify-between'>
                {videos?.map((video: Video, index: number) => (
                    <div key={index} className='mt-3 w-[32%] max-w-[500px] rounded-md'>
                        <Link to={`/video/${index}`} className='cursor-pointer block'>
                            <div className='w-full h-48 bg-white overflow-hidden rounded-tl-md rounded-tr-md'>
                                <img src={video?.thumbnailUrl} className='object-cover w-full h-full' alt="Thumbnail"/>
                            </div>
                            <div className='flex justify-between'>
                                <div className=''>
                                    <div className='rounded-full w-[46px] h-[46px] overflow-hidden my-4'>
                                        <img src={video?.thumbnailUrl} alt="Thumbnail" className='overflow-clip rounded-full w-[46px] h-[46px]' />
                                    </div>
                                </div>
                                <div className='flex-1 pl-4'>
                                    <div className='pt-4 font-medium'>
                                        {video?.title}
                                    </div>
                                    <div className='font-thin text-xs'>{video?.author}</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
