import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'

const ProtectedRoute = props => {
  const token = Cookies.get('jwt_token')
  const {render, ...rest} = props

  return (
    <Route
      {...rest}
      render={routeProps => {
        if (token !== undefined) {
          return render(routeProps)
        }

        return (
          <Redirect
            to={{
              pathname: '/login',
              state: {from: routeProps.location},
            }}
          />
        )
      }}
    />
  )
}

export default ProtectedRoute
