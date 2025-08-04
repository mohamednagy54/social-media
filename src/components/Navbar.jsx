import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const baseUrl = 'https://linked-posts.routemisr.com'

const Navbar = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) return

    getUserData(token)
  }, [navigate])

  const getUserData = async (token) => {
    try {
      const response = await axios.get(`${baseUrl}/users/profile-data`, {
        headers: {
          token: token,
        },
      })

      const userData = response.data.user

      setUser({
        name: userData.name,
        img: userData.photo,
      })
    } catch (error) {
      console.error('Error fetching user data:', error)
      setUser(null)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Logo"
            className="h-8"
          />
          <span className="text-xl font-semibold  text-gray-900 dark:text-white">
            Kwittr
          </span>
        </Link>

        {user ? (
          <div className="flex items-center gap-4">
            <img
              src={user.img}
              alt="user img"
              className="w-8 h-8 rounded-full object-cover bg-amber-800"
            />
            <p className="text-gray-900 dark:text-white font-medium">
              Hello <span className="text-[14px]">{user.name}</span>
            </p>
            <button
              onClick={handleLogout}
              className="px-3 py-2 cursor-pointer rounded-md bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition ${
                    isActive
                      ? 'text-white bg-blue-600'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition ${
                    isActive
                      ? 'text-white bg-blue-600'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`
                }
              >
                Register
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar
