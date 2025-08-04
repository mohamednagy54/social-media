import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BsThreeDots } from 'react-icons/bs'
import { Link, useParams } from 'react-router-dom'
import postImgDefault from '../../assets/default-post-bg.png'
import profileImgDefault from '../../assets/default-profile-img.png'
import Loader from '../../components/Loader'

const baseUrl = 'https://linked-posts.routemisr.com'

const SinglePost = () => {
  const [post, setPost] = useState(null)
  const [visibleComments, setVisibleComments] = useState(5)
  const [loading, setLoading] = useState(true)

  const { id: postId } = useParams()

  const getPostDetails = async () => {
    try {
      const response = await axios.get(`${baseUrl}/posts/${postId}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })

      if (response.data.message === 'success') {
        setPost(response.data.post)
      } else {
        toast.error('Failed to load post.')
      }
    } catch (error) {
      console.error('Error fetching post:', error)
      toast.error('Error loading post.')
    }
  }

  useEffect(() => {
    getPostDetails()
  }, [postId])

  if (!post) {
    return <Loader />
  }

  const {
    comments,
    body: desc,
    createdAt,
    image: postImg,
    user: { name, photo },
  } = post

  return (
    <div className="min-h-screen bg-[#0e1629] text-white py-10 px-4">
      {
        <div className="max-w-2xl mx-auto bg-gray-900 p-6 rounded-xl shadow-md space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src={photo || profileImgDefault}
                alt={name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-medium">{name}</div>
                <p className="text-xs text-slate-400">
                  {new Date(createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <BsThreeDots className="text-gray-400 cursor-pointer" />
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

          {comments?.length > 0 &&
            comments?.slice(0, visibleComments).map((comment) => {
              const {
                _id: commentId,
                commentCreator: { name: commentName, photo: commentPhoto },
                content: commentContent,
                createdAt: commentDate,
              } = comment
              return (
                <div
                  key={commentId}
                  className="mt-4 border-t border-gray-700 pt-4"
                >
                  <div className="flex gap-3">
                    <img
                      src={
                        commentPhoto?.includes('undefined') || !commentPhoto
                          ? profileImgDefault
                          : commentPhoto
                      }
                      alt={commentName}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-semibold">{commentName}</div>
                      <div className="text-xs text-slate-400 mb-1">
                        {new Date(commentDate).toLocaleDateString()}
                      </div>
                      <p className="text-sm text-slate-200">{commentContent}</p>
                    </div>
                  </div>
                </div>
              )
            })}

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
