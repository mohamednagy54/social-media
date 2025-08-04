import React from 'react'

const Loader = () => {
  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-md space-y-4 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
          <div className="w-24 h-4 bg-gray-700 rounded"></div>
          <div className="w-16 h-3 bg-gray-700 rounded"></div>
        </div>
        <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
      </div>

      <div className="w-full h-4 bg-gray-700 rounded"></div>
      <div className="w-full h-52 bg-gray-700 rounded"></div>

      <div className="flex justify-between items-center pt-2">
        <div className="w-20 h-3 bg-gray-700 rounded"></div>
        <div className="w-12 h-3 bg-gray-700 rounded"></div>
      </div>

      <div className="mt-4 border-t border-gray-700 pt-4 flex gap-3">
        <div className="w-9 h-9 bg-gray-700 rounded-full"></div>
        <div className="space-y-2">
          <div className="w-24 h-3 bg-gray-700 rounded"></div>
          <div className="w-16 h-2 bg-gray-700 rounded"></div>
          <div className="w-32 h-3 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default Loader
