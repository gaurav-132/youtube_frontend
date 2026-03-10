import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import VideoPlayer from '../features/video/components/VideoPlayer';
import useGetPlayingVideo from '../features/video/hooks/useGetPlayingVideo';
import useGetRecommendedVideos from '../features/video/hooks/useGetRecommendedVideos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faShare, faEllipsis, faFilter, faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as filledLike, faThumbsDown as filledDislike } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useHandleApiError } from '../shared/hooks/useHandleApiError';
import PostComments from '../features/comment/components/PostComments';
import useGetPostComments from '../features/comment/hooks/useGetPostComments';
import VideoPageShimmer, { RelatedVideosShimmer } from '../features/video/components/shimmer/VideoPlayShimmer';

export interface Owner {
    _id: string;
    username: string;
    email: string;
    fullName: string;
    avatar: string;
    coverImage: string;
}

export interface Video {
    _id: string;
    title: string;
    thumbnail: string;
    ownerInfo: Owner;
    videoFile: string;
    description: string;
    views?: number;
}

export interface RecommendedVideos {
    _id: string;
    title: string;
    thumbnail: string;
    ownerInfo: Owner;
    videoFile: string;
    views?: number;
}

export interface Comments {
    _id: string;
    comment: string;
    userInfo: Owner;
    replies: number;
}

const VideoPage = () => {
    const { id } = useParams();
    console.log(id);
    const { video, loading, error, getVideo } = useGetPlayingVideo(id || '');
    const { recommendedVideos, loading: recommendedLoading, getRecommendedVideos } = useGetRecommendedVideos(id || '');
    const { postComments, getPostComments } = useGetPostComments(id || '');

    const dispatch = useDispatch();
    const handleApiError = useHandleApiError();

    const [isExpanded, setIsExpanded] = useState(false);
    const [likeAnimation, setLikeAnimation] = useState(false);
    const [dislikeAnimation, setDislikeAnimation] = useState(false);
    const [showCommentBtns, setShowCommentBtns] = useState(false);
    const [formData, setFormData] = useState({
        comment: ''
    });

    const [videoInfo, setVideoInfo] = useState<any>({
        likesCount: 0,
        dislikesCount: 0,
        isUserSubscribed: false,
        subscribers: 0,
        userLiked: false,
        userDisliked: false
    });

    useEffect(() => {
        if (id) {
            getVideo(id);
            getRecommendedVideos(id);
            getPostComments(id);
        }
    }, [id]);

    useEffect(() => {
        if (video) {
            setVideoInfo((prev: any) => ({
                ...prev,
                likesCount: (video as any).likesCount || 0,
                userLiked: (video as any).isLiked || false,
                isUserSubscribed: (video as any).isSubscribed || false,
            }));
        }
    }, [video]);


    const handleLikeDislikePost = async (obj: { like?: number, dislike?: number }) => {
        if (obj.like) {
            setLikeAnimation(true);
            setTimeout(() => setLikeAnimation(false), 500);
        }
        if (obj.dislike) {
            setDislikeAnimation(true);
            setTimeout(() => setDislikeAnimation(false), 500);
        }
    };

    const handleSubscribeChannel = async () => {
        setVideoInfo((prev: any) => ({ ...prev, isUserSubscribed: !prev.isUserSubscribed }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitComment = async () => {
        setFormData({ comment: '' });
        setShowCommentBtns(false);
    };


    if (loading) {
        return (
            <div className="flex justify-center bg-[#0f0f0f] min-h-screen text-white pt-[20px] px-4 md:px-12 lg:px-6 max-w-[1800px] mx-auto">
                <VideoPageShimmer />
            </div>
        );
    }

    return (
        <div className="flex justify-center bg-[#0f0f0f] min-h-screen text-white pt-[20px] px-4 md:px-12 lg:px-6 max-w-[1800px] mx-auto">
            <div className="flex flex-col lg:flex-row w-full gap-6">

                {/* Left Column: Video Player, Info, Comments */}
                <div className="flex-1 min-w-0">

                    {/* Video Player Section */}
                    <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg mb-4">
                        {video && Object.keys(video).length > 0 && (video as Video).videoFile ? (
                            <VideoPlayer videoUrl={(video as Video).videoFile} />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-900">
                                <p className="text-gray-500">Video not found</p>
                            </div>
                        )}
                    </div>

                    {/* Video Title */}
                    <h1 className="text-xl md:text-2xl font-bold mb-3 break-words line-clamp-2">
                        {(video as Video)?.title || "Untitled Video"}
                    </h1>

                    {/* Actions Row: Channel Info + Buttons */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">

                        {/* Channel Info */}
                        <div className="flex items-center min-w-0">
                            <Link to={`/channel/${(video as Video)?.ownerInfo?._id}`} className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-700 cursor-pointer">
                                <img
                                    src={(video as Video)?.ownerInfo?.avatar || 'https://via.placeholder.com/40'}
                                    className="w-full h-full object-cover"
                                    alt="Channel Avatar"
                                />
                            </Link>
                            <div className="ml-3 flex flex-col mr-6">
                                <Link to={`/channel/${(video as Video)?.ownerInfo?._id}`} className="font-semibold text-base line-clamp-1 hover:text-gray-300 transition-colors cursor-pointer">
                                    {(video as Video)?.ownerInfo?.username || "Channel Name"}
                                </Link>
                                <span className="text-xs text-[#AAAAAA]">
                                    {(videoInfo as any).subscribers || "0"} subscribers
                                </span>
                            </div>
                            <button
                                onClick={handleSubscribeChannel}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${(videoInfo as any).isUserSubscribed
                                    ? "bg-[#272727] text-white hover:bg-[#3f3f3f]"
                                    : "bg-white text-black hover:bg-[#d9d9d9]"
                                    }`}
                            >
                                {(videoInfo as any).isUserSubscribed ? "Subscribed" : "Subscribe"}
                            </button>
                        </div>

                        {/* Action Buttons (Like, Share, etc.) */}
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">

                            {/* Like & Dislike Pill */}
                            <div className="flex items-center bg-[#272727] rounded-full h-9">
                                <button
                                    onClick={() => handleLikeDislikePost({ like: 1 })}
                                    className="flex items-center pl-4 pr-3 h-full hover:bg-[#3f3f3f] rounded-l-full border-r border-[#3f3f3f] transition-colors"
                                >
                                    <FontAwesomeIcon
                                        icon={(videoInfo as any).userLiked ? filledLike : faThumbsUp}
                                        className={`text-lg mr-2 ${(videoInfo as any).userLiked ? "text-white" : "text-white"}`}
                                    />
                                    <span className="text-sm font-medium">{(videoInfo as any).likesCount || "Like"}</span>
                                </button>
                                <button
                                    onClick={() => handleLikeDislikePost({ dislike: 1 })}
                                    className="flex items-center pl-3 pr-4 h-full hover:bg-[#3f3f3f] rounded-r-full transition-colors"
                                >
                                    <FontAwesomeIcon icon={(videoInfo as any).userDisliked ? filledDislike : faThumbsDown} className="text-lg" />
                                </button>
                            </div>

                            {/* Share Button */}
                            <button className="flex items-center bg-[#272727] hover:bg-[#3f3f3f] text-white px-4 h-9 rounded-full text-sm font-medium transition-colors">
                                <FontAwesomeIcon icon={faShare} className="mr-2 text-lg" />
                                Share
                            </button>

                            {/* More Options */}
                            <button className="flex items-center justify-center bg-[#272727] hover:bg-[#3f3f3f] w-9 h-9 rounded-full transition-colors text-white font-bold flex-shrink-0">
                                <FontAwesomeIcon icon={faEllipsis} />
                            </button>
                        </div>
                    </div>

                    {/* Description Box */}
                    <div
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={`bg-[#282828] hover:bg-[#3f3f3f] rounded-xl p-3 text-sm cursor-pointer transition-colors mb-6 ${isExpanded ? 'active' : ''}`}
                    >
                        <div className="flex gap-2 font-bold mb-1">
                            <span>{(video as Video)?.views || 0} views</span>
                            <span>1 year ago</span>
                            {/* <span className="text-[#AAAAAA]">#tag1 #tag2</span> */}
                        </div>
                        <div className={`whitespace-pre-wrap ${!isExpanded ? 'line-clamp-2' : ''}`}>
                            {(video as Video)?.description || "No description available."}
                        </div>
                        {!isExpanded && (video as Video)?.description?.length > 100 && (
                            <button className="mt-1 font-bold text-white hover:underline focus:outline-none bg-transparent p-0 border-0">
                                ...more
                            </button>
                        )}
                        {isExpanded && (
                            <button className="mt-2 font-bold text-white hover:underline focus:outline-none bg-transparent p-0 border-0">
                                Show less
                            </button>
                        )}
                    </div>

                    {/* Comments Section */}
                    <div className='hidden lg:block w-full'>
                        <div className='flex items-center mb-6'>
                            <h3 className='text-xl font-bold mr-6'>{postComments?.length || 0} Comments</h3>
                            <div className='flex items-center cursor-pointer font-medium text-sm'>
                                <FontAwesomeIcon icon={faFilter} className='mr-2' />
                                Sort by
                            </div>
                        </div>

                        {/* Add Comment Input */}
                        <div className='flex gap-4 mb-8'>
                            <img
                                className='w-10 h-10 rounded-full object-cover'
                                src={'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*h-Xf9TjO5uRfX_x9b9gY_w.jpeg'}
                                alt="User Avatar"
                            />
                            <div className='flex-1'>
                                <input
                                    type="text"
                                    value={formData.comment}
                                    className='w-full bg-transparent border-b border-[#3f3f3f] focus:border-white focus:outline-none pb-1 text-sm text-white placeholder-[#AAAAAA]'
                                    onChange={handleInputChange}
                                    onFocus={() => handleShowCommentBtn(true)}
                                    name='comment'
                                    placeholder='Add a comment...'
                                />
                                {showCommentBtns && (
                                    <div className='flex justify-between items-center mt-3'>
                                        <div className="text-xl text-[#AAAAAA] hover:text-white cursor-pointer">
                                            <FontAwesomeIcon icon={faFaceSmile} />
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                className='px-4 py-2 rounded-full text-sm font-medium hover:bg-[#3f3f3f] transition-colors'
                                                onClick={() => {
                                                    setShowCommentBtns(false);
                                                    setFormData({ ...formData, comment: '' });
                                                }}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className={`px-4 py-2 rounded-full text-sm font-medium text-black transition-colors ${formData?.comment.trim() !== '' ? 'bg-[#3EA6FF] hover:bg-[#65b8ff]' : 'bg-[#3f3f3f] text-[#717171] cursor-not-allowed'}`}
                                                onClick={handleSubmitComment}
                                                disabled={formData?.comment.trim() === ''}
                                            >
                                                Comment
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Comments List */}
                        <div className='space-y-4'>
                            {postComments?.length > 0 && <PostComments postComments={postComments} postId={id || ''} />}
                        </div>
                    </div>
                </div>

                {/* Right Column: Recommended Videos (Sidebar) */}
                <div className="hidden lg:block w-[400px] flex-shrink-0">
                    <div className="flex flex-col gap-2">
                        {/* Filter Chips (Optional placeholder for future) */}
                        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-2">
                            <span className="bg-white text-black px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer">All</span>
                            <span className="bg-[#272727] text-white hover:bg-[#3f3f3f] px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap transition-colors cursor-pointer">From {(video as Video)?.ownerInfo?.username || 'Channel'}</span>
                            <span className="bg-[#272727] text-white hover:bg-[#3f3f3f] px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap transition-colors cursor-pointer">Related</span>
                        </div>

                        {recommendedLoading ? (
                            <RelatedVideosShimmer />
                        ) : (
                            recommendedVideos && recommendedVideos.map((video, index) => (
                                <Link key={index} to={`/video/${video._id}`} className='flex gap-2 group cursor-pointer mb-2'>
                                    <div className="relative w-[168px] h-[94px] flex-shrink-0 rounded-lg overflow-hidden">
                                        <img
                                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-200'
                                            src={video?.thumbnail}
                                            alt={video?.title}
                                        />
                                        {/* Duration Badge (Mock) */}
                                        <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded font-medium">12:34</span>
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold line-clamp-2 text-white mb-1 leading-tight group-hover:text-gray-200">
                                            {video?.title}
                                        </h4>
                                        <div className="text-xs text-[#AAAAAA] hover:text-white transition-colors">
                                            {video?.ownerInfo?.username}
                                        </div>
                                        <div className="text-xs text-[#AAAAAA]">
                                            {video?.views || 500} views • 1 year ago
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                        {!recommendedLoading && recommendedVideos && recommendedVideos.length === 0 && (
                            <p className="text-sm text-[#AAAAAA] text-center mt-4">No recommendations available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoPage;