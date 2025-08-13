import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsThreeDots } from 'react-icons/bs'
import axios from 'axios'
import toast from 'react-hot-toast'
import postImgDefault from '../../assets/default-post-bg.png'
import profileImgDefault from '../../assets/default-profile-img.png'
import Loader from '../../components/Loader'
import { useQuery } from '@tanstack/react-query'
import { UserContext } from '../../context/UserContext'
import PostOptions from '../../components/PostOptions'
import EditPostModal from '../../components/EditPostModal'

const baseUrl = 'https://linked-posts.routemisr.com'

const MyPosts = () => {
  const [openMenuId, setOpenMenuId] = useState(null)
  const [editPostData, setEditPostData] = useState(null)

  const { user } = useContext(UserContext)

  const getMyPosts = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/users/${user._id}/posts?limit=20`,
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

  const {
    data: posts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['myPosts'],
    queryFn: getMyPosts,
    refetchOnWindowFocus: true,
    enabled: !!user,
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
        refetch()
      }
      setOpenMenuId(null)
    } catch (error) {
      console.error('Error deleting post:', error)
      toast.error('Failed to delete post')
    }
  }

  const handleUpdatePost = async (data) => {
    console.log(data)

    try {
      const { body, image } = data

      const formData = new FormData()
      formData.append('body', body)

      if (image && image.length > 0) {
        formData.append('image', image[0])
      }

      const response = await axios.put(
        `${baseUrl}/posts/${editPostData._id}`,
        formData,
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      )

      if (response.data.message === 'success') {
        toast.success('Post updated successfully')
        refetch()
        setEditPostData(null)
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to update post')
    }
  }

  return (
    <div className="min-h-screen bg-[#0e1629] text-white py-10 px-4">
      <div
        className="max-w-5xl mx-auto grid gap-6
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4"
      >
        {isLoading ? (
          <Loader />
        ) : posts?.length > 0 ? (
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
                className="bg-gray-900 p-6 rounded-xl shadow-md space-y-4 min-h-[350px] flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={photo || profileImgDefault}
                        alt={name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="">
                        <p className="font-medium text-sm">{name}</p>
                        <p className="text-xs text-slate-400  whitespace-nowrap">
                          {new Date(createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-slate-400  whitespace-nowrap">
                          {new Date(createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute:"2-digit"
                          })}
                        </p>
                      </div>
                    </div>

                    {user._id === postCreatorId && (
                      <PostOptions
                        postId={postId}
                        desc={desc}
                        postImg={postImg}
                        onEdit={(data) => {
                          setEditPostData(data)
                        }}
                        onDelete={handleDeletePost}
                        openMenuId={openMenuId}
                        setOpenMenuId={setOpenMenuId}
                      />
                    )}
                  </div>

                  <p className="text-slate-300 line-clamp-3">{desc}</p>

                  <img
                    src={
                      postImg?.includes('undefined') || !postImg
                        ? postImgDefault
                        : postImg
                    }
                    alt="Post"
                    className="w-full h-40 rounded-lg object-cover mt-3"
                  />
                </div>

                <div className="flex justify-between items-center pt-2 text-sm text-slate-400">
                  <Link
                    to={`/posts/${postId}`}
                    className="text-blue-400 hover:underline"
                  >
                    View details
                  </Link>
                  <span>{comments.length} comments</span>
                </div>
              </div>
            )
          })
        ) : (
          <p className="text-center text-gray-400 col-span-full">
            No posts to display.
          </p>
        )}
      </div>

      {editPostData && (
        <EditPostModal
          editPostData={editPostData}
          onClose={() => setEditPostData(null)}
          onSubmit={handleUpdatePost}
        />
      )}
    </div>
  )
}

export default MyPosts
