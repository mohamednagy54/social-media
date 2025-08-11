import { useForm } from 'react-hook-form'
import { FaImage } from 'react-icons/fa'

const CreatePost = () => {
  const { handleSubmit, register } = useForm()

  const handleCreatePost = async (data) => {
    try {
      console.log(data);
      


    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  return (
    <div className="bg-gray-900 border max-w-5xl mx-auto border-gray-900 rounded-lg p-4 shadow-md mb-6 text-center ">
      <h2 className="text-white text-lg font-semibold mb-3">
        Create a New Post
      </h2>
      <form onSubmit={handleSubmit(handleCreatePost)} className="flex flex-col gap-3">
        <textarea
          {...register('body', { required: true })}
          placeholder="What's on your mind?"
          rows="3"
          className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
        ></textarea>

        <label
          htmlFor="image-upload"
          className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-blue-500 transition"
        >
          <FaImage size={20} />
          <span>Upload Image</span>
        </label>

        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          {...register('image')}
        />

        <button
          type="submit"
          className="self-end cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          Create Post
        </button>
      </form>
    </div>
  )
}

export default CreatePost
