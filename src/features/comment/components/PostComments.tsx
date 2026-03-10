import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faCaretDown, faSmile } from '@fortawesome/free-solid-svg-icons';
import { BACKEND_URL } from '../../../utils/constant';
import { Comments, Owner } from '../../../pages/VideoPage';
import ShowRepliedComment from './ShowRepliedComment';
import CommentComp from './CommentComp';
import { useHandleApiError } from '../../../shared/hooks/useHandleApiError';

interface PostCommentsProps {
    postComments: Comments[] | null;
    postId: string;
}

export interface CommentData {
    comment: string;
    postId: string;
    parentCommentId: string;
}


const PostComments: React.FC<PostCommentsProps> = ({ postComments, postId }) => {

    const handleApiError = useHandleApiError();

    const [replyCommentIds, setReplyCommentIds] = useState<string[]>([]);
    const [commentData, setCommentData] = useState<CommentData>({ comment: '', postId: postId, parentCommentId: '' });
    const [commentReplies, setCommentReplies] = useState<Comments[]>([]);
    const [showCommentReplyIds, setShowCommentReplyIds] = useState<string[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCommentData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleReplySection = (commentId: string): void => {
        setCommentData({ ...commentData, parentCommentId: commentId });
        setReplyCommentIds([...replyCommentIds, commentId]);
    };

    const discardReply = (commentId: string) => {
        const updatedReplyCommentIds = replyCommentIds.filter(id => id !== commentId);
        setReplyCommentIds(updatedReplyCommentIds);
    };

    const handleGetCommentReplies = async (commentId: string) => {
        const updatedIds = showCommentReplyIds.includes(commentId)
            ? showCommentReplyIds.filter(replyId => replyId !== commentId)
            : [...showCommentReplyIds, commentId];

        setShowCommentReplyIds(updatedIds);
        fetchCommentReplies(commentId);
    };

    const fetchCommentReplies = async (commentId: string) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const URI = BACKEND_URL + '/api/v1/youtube/get-comment-replies';
            const resp = await fetch(URI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ commentId, postId })
            });

            if (!resp.ok) {
                throw new Error('Failed to fetch comment replies');
            }

            const data = await resp.json();
            setCommentReplies(data.data.flatComments);
        } catch (error) {
            console.error('Error fetching comment replies:', error);
        }
    };

    const handleSubmitComment = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const URI = BACKEND_URL + '/api/v1/youtube/submit-comment-reply';
            const resp = await fetch(URI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(commentData)
            });

            if (!resp.ok) {
                const error = await resp.json();
                throw error;
            }

            const data = await resp.json();
            const replies = data.replies;
            console.log(replies);
        } catch (error) {
            handleApiError(error);
            console.error('Error submitting comment reply:', error);
        }
    };

    return (
        <div>
            {postComments?.map((comment: Comments) => (
                <div className='mb-8' key={comment._id}>
                    <div className='w-full flex'>
                        <div className='w-12'>
                            <img className='w-16 h-12 rounded-full object-cover' src={comment.userInfo.avatar} alt={`Avatar of ${comment.userInfo.username}`} />
                        </div>
                        <div className='ml-3 w-90'>
                            <div>
                                <div className='text-xs'>@{comment.userInfo.username}</div>
                                <div className='text-base mt-1'>{comment.comment}</div>
                            </div>
                            <div className='flex mt-1'>
                                <div>
                                    <FontAwesomeIcon icon={faThumbsUp} fontSize='sm' />&nbsp;&nbsp;
                                </div>
                                <div className='ml-2'>
                                    <FontAwesomeIcon icon={faThumbsDown} fontSize='sm' />&nbsp;&nbsp;
                                </div>
                                <button className='ml-3 text-sm pt-1' onClick={() => handleReplySection(comment._id)}>Reply</button>
                            </div>
                        </div>
                    </div>
                    <div className='ml-12'>
                        {replyCommentIds.includes(comment._id) && (
                            <CommentComp
                                handleInputChange={handleInputChange}
                                discardReply={discardReply}
                                commentId={comment._id}
                                commentData={commentData}
                                handleSubmitComment={handleSubmitComment}
                            />
                        )}
                        {comment.replies > 0 && (
                            <button
                                className='mt-1 active-show-replies px-[14px] py-[6px] text-[#3ea6ff]'
                                onClick={() => handleGetCommentReplies(comment._id)}
                            >
                                <FontAwesomeIcon icon={faCaretDown} fontSize='sm' />&nbsp;&nbsp;
                                <span className='ml-3 text-[14px]'>{comment.replies} Reply</span>
                            </button>
                        )}
                        {commentReplies.length > 0 && showCommentReplyIds.includes(comment._id) && (
                            <ShowRepliedComment
                                commentReplies={commentReplies}
                                handleReplySection={handleReplySection}
                                commentData={commentData}
                                setCommentData={setCommentData}
                                replyCommentIds={replyCommentIds}
                                setReplyCommentIds={setReplyCommentIds}
                                handleSubmitComment={handleSubmitComment}
                                discardReply={discardReply}
                                handleInputChange={handleInputChange}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostComments;
