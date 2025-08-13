import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { FiArrowLeft } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import postImgDefault from '../../assets/default-post-bg.png'
import profileImgDefault from '../../assets/default-profile-img.png'
import Loader from '../../components/Loader'
import CreateComment from '../../components/CreateComment'
import { useQuery } from '@tanstack/react-query'
import { UserContext } from '../../context/UserContext'
import Comment from '../../components/Comment'

const baseUrl = 'https://linked-posts.routemisr.com'

const SinglePost = () => {
  const [visibleComments, setVisibleComments] = useState(5)

  const { id: postId } = useParams()

  const {
    data: post,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['post'],
    queryFn: getPostDetails,
    refetchOnWindowFocus: true,
  })

  async function getPostDetails() {
    try {
      const response = await axios.get(`${baseUrl}/posts/${postId}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })

      if (response.data.message === 'success') {
        return response.data.post
      } else {
        toast.error('Failed to load post.')
      }
    } catch (error) {
      console.error('Error fetching post:', error)
      toast.error('Error loading post.')
    }
  }

  if (isLoading || !post) {
    return <Loader />
  }

  const {
    comments,
    body: desc,
    createdAt,
    image: postImg,
    user: { name: postCreatorName, photo: postCreatorPhoto },
  } = post

  const postDate = new Date(createdAt)



  return (
    <div className="min-h-screen bg-[#0e1629] text-white py-10 px-4">
      <Link
        to="/"
        className="inline-block text-white hover:text-blue-400 text-2xl"
        aria-label="Back to home"
      >
        <FiArrowLeft />
      </Link>

      {
        <div className="max-w-2xl mx-auto bg-gray-900 p-6 rounded-xl shadow-md space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src={postCreatorPhoto || profileImgDefault}
                alt={postCreatorName}
                className="w-10 h-10 rounded-full "
              />
              <div className="">
                <span className="font-medium">{postCreatorName}</span>
                <p className="text-xs text-slate-400  whitespace-nowrap">
                  {postDate.toLocaleDateString()}
                </p>
                <p className="text-xs text-slate-400  whitespace-nowrap">
                  {postDate.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </div>

          <p className="text-slate-300">{desc}</p>

          <img
            src={
              postImg?.includes('undefined') || !postImg
                ? postImgDefault
                : postImg
            }
            alt="Post"
            className="w-full h-auto rounded-lg"
          />

          <div className="flex justify-between items-center pt-2 text-sm text-slate-400">
            <Link to="/" className="text-blue-400 hover:underline">
              Back to Home
            </Link>
            <span>{comments.length} comments</span>
          </div>

          <CreateComment postId={postId} refetch={refetch} />

          {comments?.length > 0 &&
            comments
              ?.slice(0, visibleComments)
              .map((comment) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  refetch={refetch}
                />
              ))}

          {visibleComments < comments.length && (
            <button
              onClick={() => setVisibleComments((prev) => prev + 5)}
              className="mt-4 text-blue-400 hover:underline text-sm"
            >
              Load More
            </button>
          )}
        </div>
      }
    </div>
  )
}

export default SinglePost
