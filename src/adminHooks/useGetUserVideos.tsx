import { useEffect, useState } from "react";
import { BACKEND_URL } from "../utils/constant";

interface Video {
    videoFile: string;
    title: string;
    visibility?: string;
    restrictions?: string;
    date: string;
    views: number;
    comments?: number;
    likes?: number;
}

const useGetUserVideos = (): Video[] => {
    const [videos, setVideos] = useState<Video[]>([]);

    const URI = BACKEND_URL + '/api/v1/users/get-videos';

    const getUserVideos = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(URI, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const data = await response.json();
            setVideos(data.data);
            console.log(videos);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserVideos();
    }, []);

    return videos;
};

export default useGetUserVideos;
