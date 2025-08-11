



const CreatePost = () => {
  

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-md mb-6 w-1/2 mx-auto">
      <h2 className="text-white text-lg font-semibold mb-3">
        Create a New Post
      </h2>
      <form className="flex flex-col gap-3">
        <textarea
          placeholder="What's on your mind?"
          rows="3"
          className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
        ></textarea>

        <input type="file" accept="image/*" className="text-gray-400 text-sm" />

        <button
          type="submit"
          className="self-end bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          Post
        </button>
      </form>
    </div>
  )
}

export default CreatePost
