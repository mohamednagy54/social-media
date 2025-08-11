import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const EditProfile = () => {
  let { register, handleSubmit, watch } = useForm()
  const [preview, setPreview] = useState(null)

  const photoFile = watch('photo')

  useEffect(() => {
    if (photoFile && photoFile.length > 0) {
      const file = photoFile[0]
      console.log(file)
      if (file) {
        setPreview(URL.createObjectURL(file))
      }
    }
  }, [photoFile])

  async function uploadProfileImg(data) {
    console.log(data.photo)

    try {
      const formData = new FormData()
      formData.append('photo', data.photo[0])
      const response = await axios.put(
        'https://linked-posts.routemisr.com/users/upload-photo',
        formData,
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      )
      if (response.data.message === 'success') {
        toast.success('Profile image updated successfully')
      } else {
        toast.error('Failed to update profile image')
      }

      console.log(response)
    } catch (error) {
      console.log(error)
      toast.error('Failed to upload profile image')
    }
  }

  return (
    <form onSubmit={handleSubmit(uploadProfileImg)}>
      <div className="flex flex-col items-center justify-center w-full mt-5">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-64 h-64 border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden"
        >
          {preview ? (
            <img
              src={preview}
              alt="Profile Preview"
              className="w-full h-full object-fit rounded-full"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
          )}
          <input
            id="dropzone-file"
            {...register('photo')}
            type="file"
            className="hidden"
            accept="image/*"
          />
        </label>
      </div>

      <div className="flex justify-center items-center mt-5">
        <button
          type="submit"
          className="text-white   bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Upload Profile
        </button>
      </div>
    </form>
  )
}

export default EditProfile
