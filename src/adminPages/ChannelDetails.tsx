import React from 'react';
import useGetUserVideos from '../adminHooks/useGetUserVideos';

interface Video {
    videoFile: string;
    title: string;
    visibility?: string;
    restrictions?: string;
    date: string;
    views: number;
    comments?: number;
    likes?: number;
    visiblity?: boolean;
}


const ChannelDetails: React.FC = () => {
    const videos = (useGetUserVideos() || []) as Video[];


    return (
        <div className='bg-[#282828] h-screen'>
            <div className='pl-8 pt-6'>
                <h2 className='font-bold text-2xl'>Channel Content</h2>
            </div>
            <div className='flex pl-8 pb-3 mt-6 border-b border-[rgba(255,255,255,0.1)]'>
                <div className='mr-6 cursor-pointer'>Videos</div>
                <div className='mr-6 cursor-pointer'>Shorts</div>
                <div className='mr-6 cursor-pointer'>Live</div>
            </div>
            <div className='py-4 border-b pl-8 border-[rgba(255,255,255,0.1)]'>
                Filter
            </div>
            <div className='flex justify-between py-4 border-b pl-8 pr-4 border-[rgba(255,255,255,0.1)]'>
                <div className='mr-4'>
                    <input type="checkbox" name="" id="" />
                </div>
                <div className='flex justify-between w-full'>
                    <div className='w-1/2 mr-20'>Video</div>
                    <div className='w-1/5 text-center'>Visiblity</div>
                    <div className='w-1/5 text-center'>Restrictions</div>
                    <div className='w-1/5 text-center'>Date</div>
                    <div className='w-1/5 text-center'>Views</div>
                    <div className='w-1/5 text-center'>Comments</div>
                    <div className='w-1/5 text-center'>Likes</div>
                </div>
            </div>
            {videos?.map((video: Video, index:number) => {
                return (
                    <div key={index} className='flex py-4 border-b pl-8 pr-4 border-[rgba(255,255,255,0.1)]'>
                        <div className='mr-4'>
                            <input type="checkbox" name="" id="" />
                        </div>
                        <div className='flex justify-between w-full'>
                            <div className='flex w-1/2 mr-20'>
                                <div className='mr-4'>
                                    <video width="120" height="20">
                                        <source src={`${video?.videoFile}`} type="video/mp4"/>
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                                <div>{video?.title}</div>
                            </div>
                            <div className='w-1/5 text-center'>{video?.visiblity || 'hidden'}</div>
                            <div className='w-1/5 text-center'>{video?.restrictions || 'kids'}</div>
                            <div className='w-1/5 text-center'>{video?.date}</div>
                            <div className='w-1/5 text-center'>{video?.views}</div>
                            <div className='w-1/5 text-center'>{video?.comments || 10}</div>
                            <div className='w-1/5 text-center'>{video?.likes || 230}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ChannelDetails;
