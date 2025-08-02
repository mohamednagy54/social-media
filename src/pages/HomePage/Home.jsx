import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0e1629] text-white flex items-center justify-center px-4">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl sm:text-6xl font-bold text-white drop-shadow-lg">
          Welcome to <span className="text-blue-500">Kwittr</span>
        </h1>
        <p className="text-lg text-slate-300">
          A simple, secure, and modern way to connect with others.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-slate-100 text-slate-900 hover:bg-slate-200 px-6 py-3 rounded-md transition"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
