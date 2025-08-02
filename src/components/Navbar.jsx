import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
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
      </div>
    </nav>
  )
}

export default Navbar
