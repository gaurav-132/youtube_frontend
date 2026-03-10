import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BACKEND_URL as backendUrl } from '../utils/constant';
import { HEADER_OBJ as headerObj } from '../utils/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

interface Video {
    thumbnailUrl: string;
    title: string;
    author: string;
}

const Home: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);

    const getVideos = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/v1/youtube/get-videos`, headerObj);
            const data = await response.json();
            if (Array.isArray(data?.videos)) {
                setVideos(data.videos);
            } else if (Array.isArray(data?.videos?.data)) {
                setVideos(data.videos.data);
            } else {
                console.error('Unexpected video data format:', data);
            }
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    useEffect(() => {
        getVideos();
    }, []);

    return (
        <div className="bg-[#0f0f0f] min-h-screen text-white pb-10 pt-2 px-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8">
                {videos.map((video, index) => (
                    <article key={index} className="group cursor-pointer">
                        <Link to={`/video/${index}`} className="block">
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#202020] group-hover:rounded-none transition-all duration-200">
                                <img
                                    src={video?.thumbnailUrl || 'https://i.ytimg.com/vi/placehold/hqdefault.jpg'}
                                    className="object-cover w-full h-full"
                                    alt="Thumbnail"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${index + 10}/640/360`;
                                    }}
                                />
                                <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[11px] font-medium px-1 py-0.5 rounded-sm">
                                    {Math.floor(Math.random() * 15) + 2}:34
                                </span>
                            </div>
                        </Link>

                        <div className="flex gap-3 mt-3">
                            <div className="w-9 h-9 rounded-full overflow-hidden bg-[#333] shrink-0">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${video?.author || 'User'}&background=random&length=1`}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex-1 min-w-0 pr-2">
                                <Link to={`/video/${index}`}>
                                    <h3 className="text-[15px] font-semibold leading-[1.3] mb-1 line-clamp-2">
                                        {video?.title || 'Untitled Video'}
                                    </h3>
                                </Link>
                                <p className="text-[14px] text-[#aaaaaa] truncate">{video?.author || 'Unknown Channel'}</p>
                                <p className="text-[14px] text-[#aaaaaa] mt-0.5">
                                    {Math.floor(Math.random() * 900) + 1}K views • {Math.floor(Math.random() * 11) + 1} months ago
                                </p>
                            </div>

                            <button className="self-start p-1 rounded-full hover:bg-[#2d2d2d]">
                                <FontAwesomeIcon icon={faEllipsisVertical} className="text-[#aaaaaa] text-sm" />
                            </button>
                        </div>
                    </article>
                ))}
            </div>

            {videos.length > 0 && (
                <section className="mt-10">
                    <div className="flex items-center gap-2 mb-4">
                        <FontAwesomeIcon icon={faBolt} className="text-[#ff0033]" />
                        <h2 className="text-[26px] font-bold">Shorts</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                        {videos.slice(0, 5).map((video, index) => (
                            <article key={index} className="group cursor-pointer">
                                <div className="rounded-xl overflow-hidden bg-[#1f1f1f]">
                                    <img src={video.thumbnailUrl} className="w-full h-[320px] object-cover" alt="short" />
                                </div>
                                <div className="flex mt-2 gap-2">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-[16px] font-semibold leading-tight line-clamp-2">{video.title || 'Short title goes here'}</h3>
                                        <p className="text-[#aaaaaa] text-[14px] mt-1">{Math.floor(Math.random() * 950) + 50}K views</p>
                                    </div>
                                    <button className="self-start p-1 rounded-full hover:bg-[#2d2d2d]">
                                        <FontAwesomeIcon icon={faEllipsisVertical} className="text-[#aaaaaa] text-sm" />
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            )}

            {videos.length === 0 && (
                <div className="flex justify-center items-center h-64 text-[#aaaaaa] font-medium">
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 border-2 border-[#aaaaaa] border-t-transparent rounded-full animate-spin mb-4" />
                        Loading videos...
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
