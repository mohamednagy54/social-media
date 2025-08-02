


import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/HomePage/Home'
import Login from './pages/LoginPage/Login'
import Register from './pages/RegisterPage/Register'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {


  const routes = createBrowserRouter([{
    path: "/", element: <Layout />, children: [
      {index:true,element:<Home />},
      {path:"/login",element:<Login />},
      {path:"/register",element:<Register />},
      {path:"*",element:<NotFoundPage />},
  ]}])


  return (
    
    <RouterProvider router={routes} />
  )
}

export default App