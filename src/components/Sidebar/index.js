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

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
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

const SocialText = styled.p`
  font-weight: 600;
`

const Sidebar = ({isDarkTheme}) => (
  <SidebarContainer $dark={isDarkTheme}>
    <NavList>
      <StyledNavLink exact to="/" $dark={isDarkTheme}>
        <AiFillHome />
        <NavText>Home</NavText>
      </StyledNavLink>

      <StyledNavLink to="/trending" $dark={isDarkTheme}>
        <AiFillFire />
        <NavText>Trending</NavText>
      </StyledNavLink>

      <StyledNavLink to="/gaming" $dark={isDarkTheme}>
        <SiYoutubegaming />
        <NavText>Gaming</NavText>
      </StyledNavLink>

      <StyledNavLink to="/saved-videos" $dark={isDarkTheme}>
        <RiPlayListAddFill />
        <NavText>Saved videos</NavText>
      </StyledNavLink>
    </NavList>

    <ContactContainer $dark={isDarkTheme}>
      <SocialText>CONTACT US</SocialText>

      <ContactText>
        Enjoy! Now to see your channels and recommendations!
      </ContactText>
    </ContactContainer>
  </SidebarContainer>
)

export default Sidebar
