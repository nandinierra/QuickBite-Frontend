import Cookies from 'js-cookie'
import { Navigate } from 'react-router'
import { useCart } from '../context/context'

function ProtectedRoute({ children, adminOnly = false, userOnly = false }) {
  const jwtToken = Cookies.get('jwt_token')
  const { user, isLoading } = useCart()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#121212]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    )
  }

  if (!jwtToken) {
    return <Navigate to="/login" replace={true} />
  }

  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" replace={true} />
  }

  if (userOnly && user?.role === 'admin') {
    return <Navigate to="/admin" replace={true} />
  }

  return children
}

export default ProtectedRoute 