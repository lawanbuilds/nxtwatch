import {useState} from 'react'
import Cookies from 'js-cookie'
import {useHistory} from 'react-router-dom'

const Login = () => {
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)

  const onSubmitLogin = async event => {
    event.preventDefault()

    const userDetails = {
      username,
      password,
    }

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      setShowSubmitError(true)
      setErrorMsg(data.error_msg)
    }
  }

  return (
    <div>
      <h1>Nxt Watch</h1>

      <form onSubmit={onSubmitLogin}>
        <label htmlFor="username">USERNAME</label>

        <input
          id="username"
          type="text"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />

        <label htmlFor="password">PASSWORD</label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />

        <button type="submit">Login</button>

        {showSubmitError && <p>{errorMsg}</p>}
      </form>
    </div>
  )
}

export default Login
