import {useCallback, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import Cookies from 'js-cookie'
import styled from 'styled-components'
import Header from '../Header'
import Sidebar from '../Sidebar'

const TrendingContainer = styled.div`
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

const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`

const Heading = styled.h1`
  color: ${props => (props.$dark ? '#ffffff' : '#1e293b')};
  font-size: 28px;

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
`

const VideosList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 28px;
`

const VideoItem = styled.li`
  list-style-type: none;
`

const VideoLink = styled(Link)`
  display: flex;
  gap: 24px;
  text-decoration: none;

  @media screen and (max-width: 576px) {
    flex-direction: column;
    gap: 12px;
  }
`

const Thumbnail = styled.img`
  width: 360px;
  height: 200px;
  object-fit: cover;
  flex-shrink: 0;

  @media screen and (max-width: 900px) {
    width: 280px;
    height: 160px;
  }

  @media screen and (max-width: 576px) {
    width: 100%;
    height: auto;
  }
`

const DetailsContainer = styled.div`
  padding-top: 8px;
  min-width: 0;

  @media screen and (max-width: 576px) {
    padding-top: 0;
  }
`

const TitleContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`

const ChannelLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;

  @media screen and (max-width: 576px) {
    width: 32px;
    height: 32px;
  }
`

const TextContainer = styled.div`
  min-width: 0;
`

/*
  Important:
  Test expects video.title inside a <p> element.
*/
const VideoTitle = styled.p`
  color: ${props => (props.$dark ? '#ffffff' : '#1e293b')};
  font-size: 20px;
  font-weight: 500;
  line-height: 1.4;
  margin: 0 0 14px;

  @media screen and (max-width: 768px) {
    font-size: 17px;
    margin-bottom: 10px;
  }
`

const ChannelName = styled.p`
  color: ${props => (props.$dark ? '#94a3b8' : '#64748b')};
  font-size: 15px;
  margin: 0 0 8px;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`

const VideoMeta = styled.p`
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

const FailureImage = styled.img`
  width: 400px;
  max-width: 100%;
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

const RetryButton = styled.button`
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  background-color: #2563eb;
  color: #ffffff;
  cursor: pointer;
`

const Trending = ({isDarkTheme, onToggleTheme}) => {
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFailure, setIsFailure] = useState(false)

  const getTrendingVideos = useCallback(async () => {
    setIsLoading(true)
    setIsFailure(false)

    const jwtToken = Cookies.get('jwt_token')

    try {
      const response = await fetch('https://apis.ccbp.in/videos/trending', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })

      if (response.ok) {
        const data = await response.json()

        setVideos(data.videos)
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
    getTrendingVideos()
  }, [getTrendingVideos])

  const renderVideos = () => (
    <VideosList>
      {videos.map(video => (
        <VideoItem key={video.id}>
          <VideoLink to={`/videos/${video.id}`}>
            <Thumbnail src={video.thumbnail_url} alt="video thumbnail" />

            <DetailsContainer>
              <TitleContainer>
                <ChannelLogo
                  src={video.channel.profile_image_url}
                  alt="channel logo"
                />

                <TextContainer>
                  <VideoTitle $dark={isDarkTheme}>{video.title}</VideoTitle>

                  <ChannelName $dark={isDarkTheme}>
                    {video.channel.name}
                  </ChannelName>

                  <VideoMeta $dark={isDarkTheme}>
                    {video.view_count} views •{' '}
                    {formatDistanceToNow(new Date(video.published_at), {
                      addSuffix: true,
                    })}
                  </VideoMeta>
                </TextContainer>
              </TitleContainer>
            </DetailsContainer>
          </VideoLink>
        </VideoItem>
      ))}
    </VideosList>
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

          <RetryButton type="button" onClick={getTrendingVideos}>
            Retry
          </RetryButton>
        </FailureContainer>
      )
    }

    return renderVideos()
  }

  return (
    <TrendingContainer $dark={isDarkTheme} data-testid="trending">
      <Header isDarkTheme={isDarkTheme} onToggleTheme={onToggleTheme} />

      <BodyContainer>
        <Sidebar isDarkTheme={isDarkTheme} />

        <MainContainer>
          <HeadingContainer>
            <Heading $dark={isDarkTheme}>Trending</Heading>
          </HeadingContainer>

          {renderContent()}
        </MainContainer>
      </BodyContainer>
    </TrendingContainer>
  )
}

export default Trending
