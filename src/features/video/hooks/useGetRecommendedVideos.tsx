// useGetRecommendedVideos.tsx
import { useState, useEffect, useCallback } from 'react';
import { BACKEND_URL as backendUrl } from '../../../utils/constant';
import { HEADER_OBJ as headerObj } from '../../../utils/constant';
import { RecommendedVideos } from '../../../pages/VideoPage';

interface UseGetRecommendedVideosReturn {
    recommendedVideos: RecommendedVideos[] | null;
    loading: boolean;
    getRecommendedVideos: (videoId: string) => Promise<void>;
}

const useGetRecommendedVideos = (initialVideoId: string): UseGetRecommendedVideosReturn => {
    const [recommendedVideos, setRecommendedVideos] = useState<RecommendedVideos[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const VIDEO_URL = `${backendUrl}/api/v1/youtube/get-videos`;

    const getRecommendedVideos = useCallback(async (videoId: string) => {
        try {
            setLoading(true);
            // In a real app, you might append videoId to the URL to get related videos
            // e.g., `${VIDEO_URL}?relatedTo=${videoId}`
            // For now, keeping the existing fetch URL as per previous code
            const response = await fetch(VIDEO_URL, headerObj);
            const data = await response?.json();
            console.log("Recommended videos:", data.videos);
            setRecommendedVideos(data?.videos || []);
        } catch (error) {
            console.error("Error fetching recommended videos:", error);
            setRecommendedVideos([]);
        } finally {
            setLoading(false);
        }
    }, [VIDEO_URL]);

    useEffect(() => {
        if (initialVideoId) {
            getRecommendedVideos(initialVideoId);
        }
    }, [initialVideoId, getRecommendedVideos]);

    return { recommendedVideos, loading, getRecommendedVideos };
}

export default useGetRecommendedVideos;