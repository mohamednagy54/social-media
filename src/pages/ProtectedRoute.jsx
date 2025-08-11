import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  const { pathname } = useLocation()
  console.log(pathname)

  // الحماية العكسية
  if ((token && pathname === '/login') || (token && pathname === '/register')) {
    return <Navigate to="/" />
  }

  if (!token && pathname !== '/login' && pathname !== '/register') {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute
