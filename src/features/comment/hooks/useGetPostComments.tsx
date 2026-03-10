import React, { useState, useEffect } from 'react';
import { Comments } from '../../../pages/VideoPage';
import { BACKEND_URL } from '../../../utils/constant';

interface UseGetPostCommentsReturn {
    postComments: Comments[];
    loading: boolean;
    getPostComments: (postId: string) => Promise<void>;
}

const useGetPostComments = (initialPostId: string): UseGetPostCommentsReturn => {
    const [postComments, setPostComments] = useState<Comments[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getPostComments = React.useCallback(async (postId: string) => {
        if (!postId) return;
        try {
            setLoading(true);
            const URI = `${BACKEND_URL}/api/v1/youtube/get-post-comments/${postId}`;
            const resp = await fetch(URI);
            const data = await resp.json();
            setPostComments(data.data || []);
        } catch (error) {
            console.error("Error fetching comments:", error);
            setPostComments([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (initialPostId) {
            getPostComments(initialPostId);
        }
    }, [initialPostId, getPostComments]);

    return { postComments, loading, getPostComments };
};

export default useGetPostComments;
