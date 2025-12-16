import Cookies from 'js-cookie'
import { Navigate } from 'react-router'
import { useCart } from '../context/context'

function ProtectedRoute({ children, adminOnly = false }) {
  const jwtToken = Cookies.get('jwt_token')
  const { user, isLoading } = useCart()

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!jwtToken) {
    return <Navigate to="/login" replace={true} />
  }

  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" replace={true} />
  }

  return children
}

export default ProtectedRoute