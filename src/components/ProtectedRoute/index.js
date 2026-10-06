import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'

const ProtectedRoute = ({render, ...rest}) => {
  const token = Cookies.get('jwt_token')

  return (
    <Route
      {...rest}
      render={props => {
        if (token !== undefined) {
          return render(props)
        }

        return <Redirect to="/login" />
      }}
    />
  )
}

export default ProtectedRoute
