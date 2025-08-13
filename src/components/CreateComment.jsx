import { useForm } from 'react-hook-form'
import { FaImage } from 'react-icons/fa'
import { useContext } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

import { UserContext } from '../context/UserContext'

const CreateComment = ({ postId, refetch }) => {
  const { handleSubmit, register, reset } = useForm()
  const { user } = useContext(UserContext)

  async function handleCreateComment({ content }) {
    try {
      const response = await axios.post(
        'https://linked-posts.routemisr.com/comments',
        {
          content,
          post: postId,
        },
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      )

      if (response.data.message === 'success') {
        toast.success('Comment Created!')
        refetch()
        reset()
      } else {
        toast.error('Problem while creating comment!')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error(error.response.data.error)
    }
  }

  return (
    <div className="bg-gray-900 border max-w-5xl mx-auto border-gray-900 rounded-lg    text-center">
      <form
        onSubmit={handleSubmit(handleCreateComment)}
        className="flex flex-col gap-3 commentForm"
      >
        <div className="flex items-center gap-2">
          <img
            src={user.photo}
            alt="user img"
            className="w-9 h-9 rounded-full bg-amber-800"
          />

          <textarea
            {...register('content', { required: true })}
            placeholder="Write your comment..."
            rows="1"
            className="w-full px-3 py-2 max-h-[100px] bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="self-end cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 rounded-lg transition text-[14px]"
        >
          Add Comment
        </button>
      </form>
    </div>
  )
}

export default CreateComment
