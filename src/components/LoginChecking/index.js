import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const LoginChecking = props => {
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default LoginChecking
