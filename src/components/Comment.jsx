import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import profileImgDefault from '../assets/default-profile-img.png'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import axios from 'axios'
import { FiTrash2 } from 'react-icons/fi'

const Comment = ({ comment, refetch }) => {
  const [isEditing, setIsEditing] = useState(false)
  const { user } = useContext(UserContext)
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { content: comment.content },
  })

  const {
    _id: commentId,
    commentCreator,
    content: commentContent,
    createdAt,
  } = comment

  const isCurrentUser = commentCreator._id === user._id

  const commentPhoto = isCurrentUser
    ? user.photo || profileImgDefault
    : commentCreator.photo.includes('undefined')
    ? profileImgDefault
    : commentCreator.photo

  async function handleUpdateComment(data) {
    try {
      const response = await axios.put(
        `https://linked-posts.routemisr.com/comments/${commentId}`,
        data,
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      )

      if (response.data.message === 'success') {
        toast.success('Comment updated!')
        setIsEditing(false)
        refetch()
      } else {
        toast.error('Failed to update comment')
      }
    } catch (error) {
      console.error(error)
      toast.error('Error updating comment')
    }
  }

  async function handleDeleteComment() {
    try {
      const response = await axios.delete(
        `https://linked-posts.routemisr.com/comments/${commentId}`,
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      )

      if (response.data.message === 'success') {
        toast.success('Comment deleted!')
        refetch()
      } else {
        toast.error('Failed to delete comment')
      }
    } catch (error) {
      console.error(error)
      toast.error('Error deleting comment')
    }
  }

  const commentDate = new Date(createdAt)

  return (
    <div key={commentId} className="mt-4 border-t border-gray-700 pt-4 ">
      <div className="flex  items-center gap-3">
        <img
          src={commentPhoto}
          alt={commentCreator.name}
          className="w-9 h-9 rounded-full "
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-semibold">{commentCreator.name}</div>
              <div className="text-xs text-slate-400 mb-1">
                {commentDate.toLocaleDateString()}
                {' - '}
                <span className="text-xs text-slate-400 mb-1 ">
                  {commentDate
                    ? new Date(commentDate).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : ''}
                </span>
              </div>
            </div>

            {isCurrentUser && !isEditing && (
              <div className="flex gap-3 items-center">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-400 hover:underline text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={handleDeleteComment}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Delete comment"
                  title="Delete comment"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            )}
          </div>

          {isEditing ? (
            <form
              onSubmit={handleSubmit(handleUpdateComment)}
              className="mt-1 flex flex-col gap-2"
            >
              <textarea
                {...register('content', { required: true })}
                className="w-full px-2 py-1 rounded bg-gray-800 text-white"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 px-3 py-1 rounded text-white"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    reset({ content: commentContent })
                    setIsEditing(false)
                  }}
                  className="bg-gray-600 px-3 py-1 rounded text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <p className="text-sm text-slate-200 mt-2 px-3 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md max-w-fit">
              {commentContent}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Comment
