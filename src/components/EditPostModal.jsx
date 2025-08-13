
import { useForm } from 'react-hook-form'

const EditPostModal = ({ editPostData, onSubmit, onClose }) => {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      body: editPostData?.body || '',
      image: null,
    },
  })

  const watchedImage = watch('image')
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Edit Post</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <textarea
            className="w-full p-2 rounded bg-gray-800 text-white"
            rows="4"
            {...register('body', { required: true })}
          ></textarea>
          <input
            type="file"
            className="block w-full text-sm text-gray-400"
            {...register('image')}
            accept="image/*"
          />

          {watchedImage && watchedImage.length > 0 ? (
            <img
              src={URL.createObjectURL(watchedImage[0])}
              alt="New Preview"
              className="w-full rounded mt-2"
            />
          ) : (
            editPostData?.image && (
              <img
                src={editPostData.image}
                alt="Current"
                className="w-full rounded mt-2"
              />
            )
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPostModal
