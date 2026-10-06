import styled from 'styled-components'
import Header from '../Header'

const NotFoundContainer = styled.div`
  min-height: 100vh;
  background-color: #f9f9f9;
`

const ContentContainer = styled.div`
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 24px;
`

const FailureImage = styled.img`
  width: 350px;
  max-width: 100%;
`

const Heading = styled.h1`
  color: #1e293b;
  font-size: 32px;
  margin-bottom: 12px;

  @media screen and (max-width: 768px) {
    font-size: 26px;
  }
`

const Description = styled.p`
  color: #64748b;
  font-size: 16px;
`

const NotFound = () => (
  <NotFoundContainer>
    <Header isDarkTheme={false} onToggleTheme={() => {}} />

    <ContentContainer>
      <FailureImage
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
        alt="not found"
      />

      <Heading>Page Not Found</Heading>

      <Description>
        We are sorry, the page you requested could not be found.
      </Description>
    </ContentContainer>
  </NotFoundContainer>
)

export default NotFound
