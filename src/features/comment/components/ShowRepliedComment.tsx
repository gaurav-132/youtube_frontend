import React, { Dispatch, SetStateAction } from 'react';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CommentData } from './PostComments';
import { Comments, Owner } from '../../../pages/VideoPage';
import Comment from './CommentComp';
import { Link } from 'react-router-dom';

interface ShowRepliedCommentProps {
    commentReplies: Comments[] | null;
    handleReplySection: (commentId: string) => void;
    commentData: CommentData;
    setCommentData: React.Dispatch<React.SetStateAction<CommentData>>;
    replyCommentIds: string[];
    setReplyCommentIds: React.Dispatch<React.SetStateAction<string[]>>;
    handleSubmitComment: () => void;
    discardReply: (commentId: string) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const ShowRepliedComment: React.FC<ShowRepliedCommentProps> = ({
    commentReplies,
    handleReplySection,
    commentData,
    setCommentData,
    replyCommentIds,
    setReplyCommentIds,
    handleSubmitComment,
    discardReply,
    handleInputChange,
}) => {
    return (
        <div>
            {commentReplies?.map((comment) => (
                <div key={comment._id} className='w-full flex mt-4'>
                    <div className='w-[7%]'>
                        <img
                            className='w-16 h-12 rounded-full object-cover'
                            src={comment.userInfo.avatar}
                            alt={`Avatar of ${comment.userInfo.username}`}
                        />
                    </div>
                    <div className='ml-3 w-[93%]'>
                        <div>
                            <div className='text-xs'>@{comment.userInfo.username}</div>
                            <div className='text-base mt-1'>
                                {comment.repliedTo &&
                                    <Link to={'/'} style={{ color: '#3ea6ff', fontSize: '14px', marginRight: 10 }}>{comment?.repliedTo}</Link>
                                }
                                {comment.comment}
                            </div>
                        </div>
                        <div className='flex mt-1'>
                            <div>
                                <FontAwesomeIcon icon={faThumbsUp} fontSize='sm' />&nbsp;&nbsp;
                            </div>
                            <div className='ml-2'>
                                <FontAwesomeIcon icon={faThumbsDown} fontSize='sm' />&nbsp;&nbsp;
                            </div>
                            <button
                                className='ml-3 text-sm pt-1'
                                onClick={() => handleReplySection(comment._id)}
                            >
                                Reply
                            </button>
                        </div>
                        {replyCommentIds.includes(comment._id) &&
                            <Comment
                                handleInputChange={handleInputChange}
                                discardReply={discardReply}
                                commentId={comment._id}
                                commentData={commentData}
                                handleSubmitComment={handleSubmitComment}
                            />
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShowRepliedComment;
