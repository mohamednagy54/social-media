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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MyPosts from './pages/MyPostsPage/MyPosts'



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
        {
          path: '/edit-profile',
          element: (
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          ),
        },
        {
          path: '/posts/:id',
          element: (
            <ProtectedRoute>
              <SinglePost />
            </ProtectedRoute>
          ),
        },
        {
          path: '/my-posts',
          element: (
            <ProtectedRoute>
              <MyPosts />
            </ProtectedRoute>
          ),
        },
        {
          path: '/login',
          element: (
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          ),
        },
        {
          path: '/register',
          element: (
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          ),
        },

        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ])

  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <RouterProvider router={routes} />
          <Toaster position="top-right" />
          <ReactQueryDevtools initialIsOpen={false} />
        </UserProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
