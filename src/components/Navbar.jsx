import { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import defaultProfileImg from '../assets/default-profile-img.png'
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi'

const Navbar = () => {
  const { user, setUser, getUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    getUser()
  }, [])

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
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            Kwittr
          </span>
        </Link>


        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-900 dark:text-white text-2xl"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <ul className="flex items-center gap-6 text-sm font-medium">
                <li>
                  <NavLink
                    to="/edit-profile"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md transition ${
                        isActive
                          ? 'text-white bg-blue-600'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`
                    }
                  >
                    Edit Profile
                  </NavLink>
                </li>
              </ul>
              <img
                src={user.photo ? user.photo : defaultProfileImg}
                alt="user img"
                className="w-9 h-9 rounded-full bg-amber-800"
              />
              <p className="text-gray-900 dark:text-white font-medium">
                Hello <span className="text-[14px]">{user.name}</span>
              </p>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
              >
                <FiLogOut size={20} />
              </button>
            </>
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
      </div>

      
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
          {user ? (
            <div className="flex flex-col gap-3 mt-3">
              <NavLink
                to="/edit-profile"
                className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                Edit Profile
              </NavLink>
              <button
                onClick={() => {
                  handleLogout()
                  setMenuOpen(false)
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
              >
                <FiLogOut /> Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 mt-3">
              <NavLink
                to="/login"
                className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
