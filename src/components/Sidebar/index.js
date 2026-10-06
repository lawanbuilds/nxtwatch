import {NavLink} from 'react-router-dom'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {RiPlayListAddFill} from 'react-icons/ri'
import styled from 'styled-components'

const SidebarContainer = styled.aside`
  width: 240px;
  min-height: calc(100vh - 70px);
  flex-shrink: 0;
  padding: 24px 0;
  background-color: ${props => (props.$dark ? '#212121' : '#ffffff')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    width: 70px;
    padding: 16px 0;
  }
`

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  list-style-type: none;
`

const NavItem = styled.li`
  margin: 0;
  padding: 0;
`

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 14px 24px;
  text-decoration: none;
  color: ${props => (props.$dark ? '#ffffff' : '#475569')};
  font-size: 16px;

  &.active {
    color: #2563eb;
    background-color: ${props => (props.$dark ? '#424242' : '#e2e8f0')};
  }

  @media screen and (max-width: 768px) {
    justify-content: center;
    padding: 16px 0;
    font-size: 22px;
  }
`

const NavText = styled.span`
  @media screen and (max-width: 768px) {
    display: none;
  }
`

const ContactContainer = styled.div`
  padding: 24px;
  color: ${props => (props.$dark ? '#ffffff' : '#475569')};

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const ContactText = styled.p`
  font-size: 14px;
  line-height: 1.5;
`

const SocialHeading = styled.p`
  font-weight: 600;
`

const SocialIconsList = styled.ul`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0;
  margin: 16px 0;
  list-style-type: none;
`

const SocialIcon = styled.img`
  width: 30px;
  height: 30px;
`

const navItemsList = [
  {
    id: 'HOME',
    name: 'Home',
    path: '/',
    icon: AiFillHome,
  },
  {
    id: 'TRENDING',
    name: 'Trending',
    path: '/trending',
    icon: AiFillFire,
  },
  {
    id: 'GAMING',
    name: 'Gaming',
    path: '/gaming',
    icon: SiYoutubegaming,
  },
  {
    id: 'SAVED_VIDEOS',
    name: 'Saved videos',
    path: '/saved-videos',
    icon: RiPlayListAddFill,
  },
]

const Sidebar = ({isDarkTheme}) => (
  <SidebarContainer $dark={isDarkTheme}>
    <NavList>
      {navItemsList.map(item => {
        const Icon = item.icon

        return (
          <NavItem key={item.id}>
            <StyledNavLink
              exact={item.path === '/'}
              to={item.path}
              $dark={isDarkTheme}
            >
              <Icon />
              <NavText>{item.name}</NavText>
            </StyledNavLink>
          </NavItem>
        )
      })}
    </NavList>

    <ContactContainer $dark={isDarkTheme}>
      <SocialHeading>CONTACT US</SocialHeading>

      <SocialIconsList>
        <li>
          <SocialIcon
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
          />
        </li>

        <li>
          <SocialIcon
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
          />
        </li>

        <li>
          <SocialIcon
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
          />
        </li>
      </SocialIconsList>

      <ContactText>
        Enjoy! Now to see your channels and recommendations!
      </ContactText>
    </ContactContainer>
  </SidebarContainer>
)

export default Sidebar
