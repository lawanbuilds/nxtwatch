import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'

const LoginPage = styled.div`
  min-height: 100vh;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`

const LoginCard = styled.div`
  width: 100%;
  max-width: 450px;
  background-color: #ffffff;
  padding: 48px;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);

  @media screen and (max-width: 480px) {
    padding: 32px 24px;
  }
`

const Logo = styled.img`
  width: 180px;
  display: block;
  margin: 0 auto 40px;

  @media screen and (max-width: 480px) {
    width: 150px;
    margin-bottom: 32px;
  }
`

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  color: #334155;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
`

const Input = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 12px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  outline: none;
  font-size: 15px;
  margin-bottom: 24px;

  &:focus {
    border-color: #2563eb;
  }
`

const ShowPasswordContainer = styled.div`
  display: flex;
  align-items: center;
  margin: -8px 0 24px;
`

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  margin: 0 8px 0 0;
`

const CheckboxLabel = styled.label`
  color: #475569;
  font-size: 14px;
`

const LoginButton = styled.button`
  width: 100%;
  height: 44px;
  border: none;
  border-radius: 4px;
  background-color: #2563eb;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #1d4ed8;
  }
`

const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 14px;
  margin-top: 16px;
`

const Login = () => {
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)

  useEffect(() => {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      history.replace('/')
    }
  }, [history])

  const onSubmitLogin = async event => {
    event.preventDefault()

    setShowSubmitError(false)
    setErrorMsg('')

    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch('https://apis.ccbp.in/login', options)

      const data = await response.json()

      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, {
          expires: 30,
        })

        history.replace('/')
      } else {
        setShowSubmitError(true)
        setErrorMsg(data.error_msg)
      }
    } catch (error) {
      setShowSubmitError(true)
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  return (
    <LoginPage>
      <LoginCard>
        <Logo
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
        />

        <LoginForm onSubmit={onSubmitLogin}>
          <Label htmlFor="username">USERNAME</Label>

          <Input
            id="username"
            type="text"
            value={username}
            onChange={event => setUsername(event.target.value)}
            placeholder="Username"
          />

          <Label htmlFor="password">PASSWORD</Label>

          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="Password"
          />

          <ShowPasswordContainer>
            <Checkbox
              id="showPassword"
              type="checkbox"
              checked={showPassword}
              onChange={event => setShowPassword(event.target.checked)}
            />

            <CheckboxLabel htmlFor="showPassword">Show Password</CheckboxLabel>
          </ShowPasswordContainer>

          <LoginButton type="submit">Login</LoginButton>

          {showSubmitError && <ErrorMessage>{errorMsg}</ErrorMessage>}
        </LoginForm>
      </LoginCard>
    </LoginPage>
  )
}

export default Login
