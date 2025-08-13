import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsThreeDots } from 'react-icons/bs'
import axios from 'axios'
import toast from 'react-hot-toast'
import postImgDefault from '../../assets/default-post-bg.png'
import profileImgDefault from '../../assets/default-profile-img.png'
import Loader from '../../components/Loader'
import CreatePost from '../../components/CreatePost'
import { useQuery } from '@tanstack/react-query'
import { UserContext } from '../../context/UserContext'
import CreateComment from '../../components/CreateComment'

import PostOptions from '../../components/PostOptions'
import EditPostModal from '../../components/EditPostModal'

const baseUrl = 'https://linked-posts.routemisr.com'
const sortByDateStr = '&sort=-createdAt'

const Home = () => {
  const [openMenuId, setOpenMenuId] = useState(null)
  const [editPostData, setEditPostData] = useState(null)
  


  const { user } = useContext(UserContext)

  const {
    data: posts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    refetchOnWindowFocus: true,
  })

  async function getPosts() {
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
      <CreatePost refetch={refetch} />
      <div className="max-w-3xl mx-auto space-y-10">
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

            const isCurrentUser = comments[0]?.commentCreator?._id === user._id

            const commentPhoto = isCurrentUser
              ? user.photo || profileImgDefault
              : comments[0]?.commentCreator?.photo.includes('undefined')
              ? profileImgDefault
              : comments[0]?.commentCreator?.photo

            const postDate = new Date(createdAt)

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
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="">
                      <span className="font-medium">{name}</span>
                      <p className="text-xs text-slate-400  whitespace-nowrap">
                        {postDate.toLocaleDateString()} - 
                        <span className="text-xs text-slate-400 ml-1  whitespace-nowrap">
                          {postDate.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
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

                <p className="text-slate-300">{desc}</p>

                <img
                  src={
                    postImg?.includes('undefined') || !postImg
                      ? postImgDefault
                      : postImg
                  }
                  alt="Post"
                  className="w-full max-h-[600px] rounded-lg"
                />

                <div className="flex justify-between items-center pt-2 text-sm text-slate-400">
                  <Link
                    to={`/posts/${postId}`}
                    className="text-blue-400 hover:underline"
                  >
                    View details
                  </Link>
                  <span>{comments.length} comments</span>
                </div>

                <CreateComment postId={postId} refetch={refetch} />

                {comments.length > 0 && (
                  <div className="mt-4 border-t border-gray-700 pt-4 ">
                    <div className="flex items-center gap-3">
                      <img
                        src={commentPhoto}
                        alt={comments[0]?.commentCreator?.name}
                        className="w-9 h-9 rounded-full "
                      />
                      <div>
                        <div className="text-sm font-semibold">
                          {comments[0]?.commentCreator?.name}
                        </div>
                        <p className="text-xs text-slate-400 mb-1">
                          {comments[0]?.createdAt
                            ? new Date(
                                comments[0]?.createdAt
                              ).toLocaleDateString()
                            : ''}{' '}
                          -
                          <span className="text-xs text-slate-400 mb-1 ml-1">
                            {comments[0]?.createdAt
                              ? new Date(
                                  comments[0]?.createdAt
                                ).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })
                              : ''}
                          </span>
                        </p>

                        <p className="text-sm text-slate-200 mt-2 px-3 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md max-w-fit">
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

export default Home
