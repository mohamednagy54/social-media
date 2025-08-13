import React from 'react'
import { BsThreeDots } from 'react-icons/bs'

const PostOptions = ({
  postId,
  desc,
  postImg,
  onEdit,
  onDelete,
  openMenuId,
  setOpenMenuId,
}) => {
  return (
    <div className="relative z-20">
      <BsThreeDots
        className="text-gray-400 cursor-pointer"
        onClick={() => setOpenMenuId(openMenuId === postId ? null : postId)}
      />
      {openMenuId === postId && (
        <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg z-30">
          <button
            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
            onClick={() => {
              onEdit({ _id: postId, body: desc, image: postImg })
              setOpenMenuId(null)
            }}
          >
            Edit Post
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
            onClick={() => onDelete(postId)}
          >
            Delete Post
          </button>
        </div>
      )}
    </div>
  )
}

export default PostOptions
