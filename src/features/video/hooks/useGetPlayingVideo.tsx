// useGetPlayingVideo.tsx
import { useState, useEffect, useCallback } from 'react';
import { BACKEND_URL } from '../../../utils/constant';
import { Video } from '../../../pages/VideoPage';

interface UseGetPlayingVideoReturn {
    video: Video | null;
    loading: boolean;
    error: string | null;
    getVideo: (videoId: string) => Promise<void>;
}

const useGetPlayingVideo = (initialVideoId: string): UseGetPlayingVideoReturn => {
    const [video, setVideo] = useState<Video | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getVideo = useCallback(async (videoId: string) => {
        if (!videoId) return;

        const URI = `${BACKEND_URL}/api/v1/youtube/get-playing-video/${videoId}`;

        try {
            setLoading(true);
            setError(null);
            console.log('Fetching video with ID:', videoId);

            const response = await fetch(URI, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data?.data) {
                setVideo(data.data);
            } else {
                setVideo(null);
            }

        } catch (error: any) {
            console.error('Error fetching video:', error);
            setError(error.message || 'Failed to fetch video');
            setVideo(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (initialVideoId) {
            getVideo(initialVideoId);
        }
    }, [initialVideoId, getVideo]);

    return { video, loading, error, getVideo };
};

export default useGetPlayingVideo;
