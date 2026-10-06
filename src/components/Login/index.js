import {useState} from 'react'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitLogin = event => {
    event.preventDefault()
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
      </form>
    </div>
  )
}

export default Login
