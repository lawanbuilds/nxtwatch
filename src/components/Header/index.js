import {useState} from 'react'
import Popup from 'reactjs-popup'
import {Link, useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiSun, FiMoon, FiLogOut} from 'react-icons/fi'
import styled from 'styled-components'

const HeaderContainer = styled.header`
  height: 70px;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => (props.$dark ? '#212121' : '#ffffff')};
  border-bottom: 1px solid ${props => (props.$dark ? '#424242' : '#e2e8f0')};

  @media screen and (max-width: 768px) {
    height: 60px;
    padding: 0 16px;
  }
`

const Logo = styled.img`
  width: 140px;

  @media screen and (max-width: 768px) {
    width: 110px;
  }
`

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;

  @media screen and (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media screen and (max-width: 768px) {
    gap: 12px;
  }
`

const IconButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${props => (props.$dark ? '#ffffff' : '#1e293b')};
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    font-size: 21px;
  }
`

const LogoutButton = styled.button`
  padding: 8px 18px;
  border: 1px solid #3b82f6;
  background-color: transparent;
  color: #3b82f6;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;

  @media screen and (max-width: 768px) {
    padding: 7px 10px;
    font-size: 12px;
  }
`

const PopupContainer = styled.div`
  width: 400px;
  max-width: 90%;
  padding: 32px;
  border-radius: 8px;
  background-color: ${props => (props.$dark ? '#212121' : '#ffffff')};
  text-align: center;
`

const PopupText = styled.p`
  color: ${props => (props.$dark ? '#ffffff' : '#1e293b')};
  font-size: 18px;
  margin-bottom: 28px;
`

const PopupActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`

const CancelButton = styled.button`
  padding: 10px 24px;
  border: 1px solid #64748b;
  background-color: transparent;
  color: ${props => (props.$dark ? '#ffffff' : '#64748b')};
  cursor: pointer;
`

const ConfirmButton = styled.button`
  padding: 10px 24px;
  border: none;
  background-color: #2563eb;
  color: #ffffff;
  cursor: pointer;
`

const Header = ({isDarkTheme = false, onToggleTheme = () => {}}) => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false)
  const history = useHistory()

  const onClickConfirm = () => {
    Cookies.remove('jwt_token')
    setShowLogoutPopup(false)
    history.replace('/login')
  }

  return (
    <HeaderContainer $dark={isDarkTheme}>
      <Link to="/">
        <Logo
          src={
            isDarkTheme
              ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          }
          alt="website logo"
        />
      </Link>

      <ActionsContainer>
        <IconButton
          type="button"
          data-testid="theme"
          aria-label="Toggle theme"
          $dark={isDarkTheme}
          onClick={onToggleTheme}
        >
          {isDarkTheme ? <FiSun /> : <FiMoon />}
        </IconButton>

        <ProfileImage
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
        />

        <LogoutButton type="button" onClick={() => setShowLogoutPopup(true)}>
          <FiLogOut />
          Logout
        </LogoutButton>
      </ActionsContainer>

      <Popup
        open={showLogoutPopup}
        modal
        closeOnDocumentClick
        onClose={() => setShowLogoutPopup(false)}
      >
        <PopupContainer $dark={isDarkTheme}>
          <PopupText $dark={isDarkTheme}>
            Are you sure, you want to logout
          </PopupText>

          <PopupActions>
            <CancelButton
              type="button"
              $dark={isDarkTheme}
              onClick={() => setShowLogoutPopup(false)}
            >
              Cancel
            </CancelButton>

            <ConfirmButton type="button" onClick={onClickConfirm}>
              Confirm
            </ConfirmButton>
          </PopupActions>
        </PopupContainer>
      </Popup>
    </HeaderContainer>
  )
}

export default Header
