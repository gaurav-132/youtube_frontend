import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-solid-svg-icons'

//interface import 
import { CommentData } from './PostComments'

interface CommentProps {
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    discardReply: (commentId: string) => void;
    handleSubmitComment: ()=> void;
    commentId: string;
    commentData: CommentData;
}


const CommentComp: React.FC<CommentProps> = ({ handleInputChange, discardReply, handleSubmitComment, commentData, commentId }) => {
  return (
    <div className='my-4 w-full flex justify-between'>
        <div className='w-[10%]'>
            <img className='w-[46.5px] rounded-full h-[46px] object-fill' src={'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*h-Xf9TjO5uRfX_x9b9gY_w.jpeg'} />
        </div>
        <div className='ml-3 w-[90%]'>
            <div>
                <input
                    type="text"
                    className='py-1 border-b-2 border-b-gray-500 w-full focus:border-b-gray-200 focus:outline-none bg-[#0f0f0f]'
                    onChange={handleInputChange}
                    name='comment'
                    placeholder='Add Comment'
                />
            </div>
            <div className='flex justify-between mt-3'>
                <div>
                    <FontAwesomeIcon icon={faSmile} fontSize={20} />&nbsp;&nbsp;
                </div>
                <div>
                    <button className='comment-cancel-btn' onClick={() => discardReply(commentId)}>Cancel</button>
                    <button
                        className={`ml-8 comment-btn bg-red px-4 my-2 rounded-md ${commentData.comment.trim() !== '' && commentData.parentCommentId === commentId && 'active-comment-submit'}`}
                        onClick={handleSubmitComment}
                    >
                        Submit
                    </button>
                </div>
                {

                }
            </div>
        </div>
    </div>
  )
}

export default CommentComp