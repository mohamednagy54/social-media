import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsThreeDots } from 'react-icons/bs'
import axios from 'axios'
import toast from 'react-hot-toast'
import postImgDefault from '../../assets/default-post-bg.png'
import profileImgDefault from '../../assets/default-profile-img.png'
import Loader from '../../components/Loader'
import CreatePost from '../../components/CreatePost'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { UserContext } from '../../context/UserContext'
import CreateComment from '../../components/CreateComment'

const baseUrl = 'https://linked-posts.routemisr.com'
const sortByDateStr = '&sort=-createdAt'

const Home = () => {
  const [openMenuId, setOpenMenuId] = useState(null)

  const queryClient = useQueryClient()

  const getPosts = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/posts?limit=50${sortByDateStr}`,
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      )
      if (response.data.message === 'success') {
        return response.data.posts
      } else {
        toast.error('Failed to load posts.')
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      toast.error('Failed to load posts..')
    }
  }

  const { user } = useContext(UserContext)

  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    refetchOnWindowFocus: true,
  })

  const handleDeletePost = async (postId) => {
    try {
      const response = await axios.delete(`${baseUrl}/posts/${postId}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      
      if (response.data.message === 'success') {
        toast.success('Post deleted Successfully')
        queryClient.invalidateQueries(['posts'])
        document.querySelector("form")
      }
      setOpenMenuId(null)
    } catch (error) {
      console.error('Error deleting post:', error)
      toast.error('Failed to delete post')
    }
  }

  return (
    <div className="min-h-screen bg-[#0e1629] text-white py-10 px-4">
      <CreatePost />
      <div className="max-w-5xl mx-auto space-y-10">
        {isLoading ? (
          <Loader />
        ) : (
          posts.map((post) => {
            const {
              _id: postId,
              createdAt,
              body: desc,
              image: postImg,
              user: { _id: postCreatorId, name, photo },
              comments,
            } = post
            

            return (
              <div
                key={postId}
                className="bg-gray-900 p-6 rounded-xl shadow-md space-y-4"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img
                      src={photo || profileImgDefault}
                      alt={name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-medium">{name}</span>
                    <p className="text-xs text-slate-400">
                      {new Date(createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {user._id === postCreatorId && (
                    <div className="relative">
                      <BsThreeDots
                        className="text-gray-400 cursor-pointer"
                        onClick={() =>
                          setOpenMenuId(openMenuId === postId ? null : postId)
                        }
                      />
                      {openMenuId === postId && (
                        <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg z-10">
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                            onClick={() => toast('Edit clicked')}
                          >
                            Edit Post
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                            onClick={() => handleDeletePost(postId)}
                          >
                            Delete Post
                          </button>
                        </div>
                      )}
                    </div>
                  )}
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
                  <Link
                    to={`/posts/${postId}`}
                    className="text-blue-400 hover:underline"
                  >
                    View details
                  </Link>
                  <span>{post.comments.length} comments</span>
                </div>

                <CreateComment postId={postId} />

                {comments.length > 0 && (
                  <div className="mt-4 border-t border-gray-700 pt-4">
                    <div className="flex gap-3">
                      <img
                        src={
                          comments[0]?.commentCreator?._id === user._id
                            ? user.photo || profileImgDefault
                            : comments[0]?.commentCreator?.commentPhoto?.includes(
                                'undefined'
                              ) || !comments[0]?.commentCreator?.commentPhoto
                            ? profileImgDefault
                            : comments[0]?.commentCreator?.commentPhoto
                        }
                        alt={comments[0]?.commentCreator?.commentName}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-semibold">
                          {comments[0]?.commentCreator?.commentName}
                        </div>
                        <div className="text-xs text-slate-400 mb-1">
                          {comments[0]?.createdAt}
                        </div>
                        <p className="text-sm text-slate-200">
                          {comments[0]?.content}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default Home
