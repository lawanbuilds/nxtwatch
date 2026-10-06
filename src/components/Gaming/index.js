import {useCallback, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import styled from 'styled-components'
import Header from '../Header'
import Sidebar from '../Sidebar'

const GamingContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => (props.$dark ? '#0f0f0f' : '#f9f9f9')};
`

const BodyContainer = styled.div`
  display: flex;
`

const MainContainer = styled.main`
  flex: 1;
  min-width: 0;
  padding: 32px;

  @media screen and (max-width: 768px) {
    padding: 20px;
  }
`

const Heading = styled.h1`
  color: ${props => (props.$dark ? '#ffffff' : '#1e293b')};
  font-size: 28px;
  margin: 0 0 32px;

  @media screen and (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 24px;
  }
`

const GamesList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;

  @media screen and (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`

const GameItem = styled.li`
  list-style-type: none;
  min-width: 0;
`

const GameLink = styled(Link)`
  text-decoration: none;
`

const Thumbnail = styled.img`
  width: 100%;
  display: block;
`

const GameTitle = styled.p`
  color: ${props => (props.$dark ? '#ffffff' : '#1e293b')};
  font-size: 16px;
  line-height: 1.4;
  margin: 12px 0 8px;

  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`

const ViewCount = styled.p`
  color: ${props => (props.$dark ? '#94a3b8' : '#64748b')};
  font-size: 14px;
  margin: 0;
`

const LoaderContainer = styled.div`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Loader = styled.div`
  width: 45px;
  height: 45px;
  border: 5px solid #cbd5e1;
  border-top: 5px solid #2563eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`

const FailureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  color: ${props => (props.$dark ? '#ffffff' : '#000000')};
  padding: 20px;
`

const FailureImage = styled.img`
  width: 400px;
  max-width: 100%;
`

const RetryButton = styled.button`
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  background-color: #2563eb;
  color: #ffffff;
  cursor: pointer;
`

const Gaming = ({isDarkTheme, onToggleTheme}) => {
  const [games, setGames] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFailure, setIsFailure] = useState(false)

  const getGamingVideos = useCallback(async () => {
    setIsLoading(true)
    setIsFailure(false)

    const jwtToken = Cookies.get('jwt_token')

    try {
      const response = await fetch('https://apis.ccbp.in/videos/gaming', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setGames(data.videos)
        setIsLoading(false)
      } else {
        setIsFailure(true)
        setIsLoading(false)
      }
    } catch (error) {
      setIsFailure(true)
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    getGamingVideos()
  }, [getGamingVideos])

  const renderGames = () => (
    <GamesList>
      {games.map(game => (
        <GameItem key={game.id}>
          <GameLink to={`/videos/${game.id}`}>
            <Thumbnail src={game.thumbnail_url} alt="video thumbnail" />

            <GameTitle $dark={isDarkTheme}>{game.title}</GameTitle>

            <ViewCount $dark={isDarkTheme}>
              {game.view_count} Watching Worldwide
            </ViewCount>
          </GameLink>
        </GameItem>
      ))}
    </GamesList>
  )

  const renderContent = () => {
    if (isLoading) {
      return (
        <LoaderContainer data-testid="loader">
          <Loader />
        </LoaderContainer>
      )
    }

    if (isFailure) {
      return (
        <FailureContainer $dark={isDarkTheme}>
          <FailureImage
            src={
              isDarkTheme
                ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
            }
            alt="failure view"
          />

          <h1>Oops! Something Went Wrong</h1>

          <p>We are having some trouble to complete your request.</p>

          <RetryButton type="button" onClick={getGamingVideos}>
            Retry
          </RetryButton>
        </FailureContainer>
      )
    }

    return renderGames()
  }

  return (
    <GamingContainer $dark={isDarkTheme} data-testid="gaming">
      <Header isDarkTheme={isDarkTheme} onToggleTheme={onToggleTheme} />

      <BodyContainer>
        <Sidebar isDarkTheme={isDarkTheme} />

        <MainContainer>
          <Heading $dark={isDarkTheme}>Gaming</Heading>

          {renderContent()}
        </MainContainer>
      </BodyContainer>
    </GamingContainer>
  )
}

export default Gaming
