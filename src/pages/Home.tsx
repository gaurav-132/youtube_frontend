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

    const VIDEO_URL = `${backendUrl}/api/v1/youtube/get-videos`;

    const getVideos = async () => {
        try {
            const response = await fetch(VIDEO_URL, headerObj);
            const data = await response.json();
            // Ensure we safeguard against data.videos existing but not being an array or the right shape
            if (data?.videos && Array.isArray(data.videos)) {
                setVideos(data.videos);
            } else if (data?.videos?.data && Array.isArray(data?.videos?.data)) {
                setVideos(data.videos.data);
            } else {
                console.error("Unexpected video data format:", data);
            }
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    }

    useEffect(() => {
        getVideos();
    }, []);

    return (
        <div className='bg-[#0f0f0f] min-h-screen text-white pt-2 pb-8'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-x-3 gap-y-10'>
                {videos.map((video: Video, index: number) => (
                    <div key={index} className='flex flex-col gap-3 cursor-pointer group'>
                        <Link to={`/video/${index}`} className='relative'>
                            {/* Thumbnail */}
                            <div className='relative w-full aspect-video rounded-xl overflow-hidden bg-[#202020] transition-all duration-200 group-hover:rounded-none'>
                                <img
                                    src={video?.thumbnailUrl || "https://i.ytimg.com/vi/placehold/hqdefault.jpg"}
                                    className='object-cover w-full h-full'
                                    alt="Thumbnail"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${index + 10}/640/360`;
                                    }}
                                />
                                <div className="absolute bottom-1.5 right-1.5 bg-black bg-opacity-80 text-white text-[11px] font-medium px-1 py-0.5 rounded-sm">
                                    {Math.floor(Math.random() * 15) + 2}:34
                                </div>
                            </div>
                        </Link>

                        {/* Info */}
                        <div className='flex gap-3 px-1'>
                            <div className='flex-shrink-0'>
                                <div className='w-9 h-9 rounded-full overflow-hidden bg-[#333] hover:opacity-90'>
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${video?.author || 'User'}&background=random&length=1`}
                                        alt="Avatar"
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col pr-6 relative w-full'>
                                <Link to={`/video/${index}`}>
                                    <h3 className='text-[15px] font-semibold text-white leading-[1.3] line-clamp-2 mb-1 pr-4'>
                                        {video?.title || "Untitled Video"}
                                    </h3>
                                </Link>
                                <div className="text-[14px] text-[#aaaaaa] flex flex-col pt-0.5">
                                    <span className="hover:text-white transition-colors cursor-pointer">{video?.author || "Unknown Channel"}</span>
                                    <span className="text-[14px] mt-0.5">
                                        {Math.floor(Math.random() * 900) + 1}K views • {Math.floor(Math.random() * 11) + 1} months ago
                                    </span>
                                </div>

                                {/* Menu Dots - Absolute positioned to the right of text */}
                                <div className='absolute top-0 right-[-4px]'>
                                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[#303030] rounded-full transition-all">
                                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {videos.length === 0 && (
                <div className="flex justify-center items-center h-64 text-[#aaaaaa] font-medium">
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 border-2 border-[#aaaaaa] border-t-transparent rounded-full animate-spin mb-4"></div>
                        Loading videos...
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
