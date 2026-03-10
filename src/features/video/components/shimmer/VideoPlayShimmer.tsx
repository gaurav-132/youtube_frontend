import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Base Shimmer wrapper to ensure consistent theming
const BaseShimmerTheme: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            {children}
        </SkeletonTheme>
    );
};

// 1. Shimmer for the main video player
export const VideoPlayerShimmer: React.FC = () => {
    return (
        <BaseShimmerTheme>
            <div className="w-full aspect-video rounded-xl overflow-hidden">
                <Skeleton height="100%" width="100%" className='h-full' />
            </div>
        </BaseShimmerTheme>
    );
};

// 2. Shimmer for the Video Info section (Title, Channel, Buttons, Description)
export const VideoInfoShimmer: React.FC = () => {
    return (
        <BaseShimmerTheme>
            <div className="w-full mt-4 animate-pulse">
                {/* Title */}
                <div className="mb-2">
                    <Skeleton height={28} width="70%" />
                </div>

                {/* Channel & Actions Row */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-2">
                    {/* Channel Info */}
                    <div className="flex items-center gap-3">
                        <Skeleton circle height={40} width={40} />
                        <div className="flex flex-col">
                            <Skeleton height={16} width={120} />
                            <Skeleton height={12} width={80} className="mt-1" />
                        </div>
                        <div className="ml-4">
                            <Skeleton height={36} width={100} borderRadius={18} />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <Skeleton height={36} width={100} borderRadius={18} />
                        <Skeleton height={36} width={80} borderRadius={18} />
                        <Skeleton circle height={36} width={36} />
                    </div>
                </div>

                {/* Description Box */}
                <div className="mt-4 p-3 bg-[#282828] rounded-xl">
                    <Skeleton count={3} />
                </div>
            </div>
        </BaseShimmerTheme>
    );
};

// 3. Shimmer for the Related/Recommended Videos sidebar
export const RelatedVideosShimmer: React.FC = () => {
    return (
        <BaseShimmerTheme>
            <div className="flex flex-col gap-3">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex gap-2">
                        {/* Thumbnail */}
                        <div className="w-[168px] h-[94px] flex-shrink-0 rounded-lg overflow-hidden">
                            <Skeleton height="100%" width="100%" />
                        </div>
                        {/* Info */}
                        <div className="flex flex-col flex-1 gap-1">
                            <Skeleton height={14} width="90%" count={2} />
                            <Skeleton height={12} width="60%" className="mt-1" />
                        </div>
                    </div>
                ))}
            </div>
        </BaseShimmerTheme>
    );
};

// 4. Comment Shimmer
export const CommentsShimmer: React.FC = () => {
    return (
        <BaseShimmerTheme>
            <div className="mt-6 flex gap-4">
                <Skeleton circle height={40} width={40} />
                <div className='flex-1'>
                    <Skeleton height={20} className='mb-2' />
                    <Skeleton height={20} width="60%" />
                </div>
            </div>
        </BaseShimmerTheme>
    )
}

// Default export acts as a full page shimmer loader if needed, or just exports
const VideoPageShimmer: React.FC = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-6 w-full">
            <div className="flex-1">
                <VideoPlayerShimmer />
                <VideoInfoShimmer />
                <div className="mt-6">
                    <CommentsShimmer />
                    <CommentsShimmer />
                </div>
            </div>
            <div className="hidden lg:block w-[400px]">
                <RelatedVideosShimmer />
            </div>
        </div>
    );
}

export default VideoPageShimmer;
