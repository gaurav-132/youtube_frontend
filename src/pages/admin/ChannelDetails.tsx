import React from 'react';
import useGetUserVideos from '../../features/admin/hooks/useGetUserVideos';

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
        <div className='bg-[#1e1e1e] min-h-screen text-white flex flex-col'>
            {/* Page Header */}
            <div className='px-6 pt-6 pb-4'>
                <h2 className='text-[22px] font-bold tracking-tight'>Channel content</h2>
            </div>

            {/* Tabs */}
            <div className='flex px-6 border-b border-[#3e3e3e]'>
                <div className='px-4 py-3 border-b-2 border-[#3ea6ff] text-[#3ea6ff] font-medium transition-colors cursor-pointer'>Videos</div>
                <div className='px-4 py-3 text-gray-400 hover:text-white transition-colors cursor-pointer'>Shorts</div>
                <div className='px-4 py-3 text-gray-400 hover:text-white transition-colors cursor-pointer'>Live</div>
                <div className='px-4 py-3 text-gray-400 hover:text-white transition-colors cursor-pointer'>Playlists</div>
            </div>

            {/* Content Table */}
            <div className='flex-1 overflow-x-auto'>
                <table className='w-full text-left border-collapse'>
                    <thead>
                        <tr className='border-b border-[#3e3e3e] text-[13px] font-medium text-[#aaaaaa]'>
                            <th className='pl-6 py-4 w-12'><input type="checkbox" className="accent-[#3ea6ff]" /></th>
                            <th className='px-4 py-4 min-w-[300px]'>Video</th>
                            <th className='px-4 py-4 text-center'>Visibility</th>
                            <th className='px-4 py-4 text-center'>Restrictions</th>
                            <th className='px-4 py-4 text-center'>Date</th>
                            <th className='px-4 py-4 text-center'>Views</th>
                            <th className='px-4 py-4 text-center'>Comments</th>
                            <th className='pr-6 py-4 text-center'>Likes (vs dislikes)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videos?.map((video: Video, index: number) => (
                            <tr key={index} className='group border-b border-[#3e3e3e] hover:bg-[#282828] transition-colors'>
                                <td className='pl-6 py-4'><input type="checkbox" className="accent-[#3ea6ff]" /></td>
                                <td className='px-4 py-4'>
                                    <div className='flex items-start gap-4'>
                                        <div className='relative w-[120px] aspect-video rounded bg-[#333] flex-shrink-0 overflow-hidden'>
                                            <img
                                                src={video?.videoFile ? `https://via.placeholder.com/120x68?text=Video` : ''}
                                                className='w-full h-full object-cover'
                                                alt="Thumbnail"
                                            />
                                            <div className="absolute bottom-1 right-1 bg-black/80 text-[10px] px-1 rounded">10:42</div>
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-sm font-medium line-clamp-2 leading-tight">{video?.title}</span>
                                            <span className="text-[12px] text-[#aaaaaa] mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Edit details</span>
                                        </div>
                                    </div>
                                </td>
                                <td className='px-4 py-4'>
                                    <div className='flex flex-col items-center justify-center gap-1'>
                                        <div className="flex items-center gap-1.5">
                                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                            <span className='text-xs'>{video?.visiblity ? 'Public' : 'Private'}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className='px-4 py-4 text-center text-xs text-gray-300'>{video?.restrictions || 'None'}</td>
                                <td className='px-4 py-4 text-center'>
                                    <div className='flex flex-col text-xs'>
                                        <span>{video?.date || 'Dec 12, 2023'}</span>
                                        <span className='text-[#aaaaaa]'>Published</span>
                                    </div>
                                </td>
                                <td className='px-4 py-4 text-center text-sm'>{video?.views || 0}</td>
                                <td className='px-4 py-4 text-center text-sm'>{video?.comments || 0}</td>
                                <td className='pr-6 py-4 text-center text-sm'>
                                    <div className='flex flex-col items-center gap-1'>
                                        <span>{video?.likes || 0}%</span>
                                        <div className='w-16 h-[2px] bg-gray-600 rounded-full overflow-hidden'>
                                            <div className='h-full bg-white' style={{ width: '85%' }}></div>
                                        </div>
                                        <span className='text-[10px] text-[#aaaaaa]'>{video?.likes || 0} likes</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ChannelDetails;
