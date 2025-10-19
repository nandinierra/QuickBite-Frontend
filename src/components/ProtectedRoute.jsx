
import Cookies from 'js-cookie'
import { Navigate } from 'react-router'
function ProtectedRoute({children}) {
  const jwtToken = Cookies.get('jwt_token')
  if(jwtToken === undefined){
    return <Navigate to="/login" replace={true}/>
  }
  return children
}

export default ProtectedRoute