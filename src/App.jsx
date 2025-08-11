import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'

import Home from './pages/HomePage/Home'
import Login from './pages/LoginPage/Login'
import Register from './pages/RegisterPage/Register'
import NotFoundPage from './pages/NotFoundPage'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './pages/ProtectedRoute'
import SinglePost from './pages/SinglePost/SinglePost'
import { UserProvider } from './context/UserContext'
import EditProfile from './pages/EditProfilePage/EditProfile'

const App = () => {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/posts/:id', element: <SinglePost /> },
        { path: '/edit-profile', element: <EditProfile /> },

        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ])

  return (
    <>
      <UserProvider>
        <RouterProvider router={routes} />
        <Toaster position="top-right" />
      </UserProvider>
    </>
  )
}

export default App
