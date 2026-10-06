import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import Header from '../Header'
import Sidebar from '../Sidebar'

const SavedVideosContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => (props.dark ? '#0f0f0f' : '#f9f9f9')};
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
  color: ${props => (props.dark ? '#ffffff' : '#1e293b')};
  font-size: 28px;
  margin-bottom: 32px;

  @media screen and (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 24px;
  }
`

const VideosList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media screen and (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
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

const VideoItem = styled.li`
  list-style-type: none;
  min-width: 0;
`

const VideoLink = styled(Link)`
  text-decoration: none;
`

const Thumbnail = styled.img`
  width: 100%;
  display: block;
`

const VideoTitle = styled.p`
  color: ${props => (props.dark ? '#ffffff' : '#1e293b')};
  font-size: 16px;
  line-height: 1.4;

  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`

const ChannelName = styled.p`
  color: ${props => (props.dark ? '#94a3b8' : '#64748b')};
  font-size: 14px;
`

const EmptyContainer = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
`

const EmptyImage = styled.img`
  width: 300px;
  max-width: 100%;
`

const EmptyHeading = styled.h1`
  color: ${props => (props.dark ? '#ffffff' : '#1e293b')};
  font-size: 28px;

  @media screen and (max-width: 768px) {
    font-size: 22px;
  }
`

const EmptyText = styled.p`
  color: ${props => (props.dark ? '#94a3b8' : '#64748b')};

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`

const SavedVideos = ({isDarkTheme, onToggleTheme}) => {
  const [savedVideos, setSavedVideos] = useState([])

  useEffect(() => {
    const videos = JSON.parse(localStorage.getItem('savedVideos') || '[]')

    setSavedVideos(videos)
  }, [])

  const renderSavedVideos = () => (
    <VideosList>
      {savedVideos.map(video => (
        <VideoItem key={video.id}>
          <VideoLink to={`/videos/${video.id}`}>
            <Thumbnail src={video.thumbnail_url} alt="video thumbnail" />

            <VideoTitle dark={isDarkTheme}>{video.title}</VideoTitle>

            <ChannelName dark={isDarkTheme}>{video.channel.name}</ChannelName>

            <ChannelName dark={isDarkTheme}>
              {video.view_count} views • {video.published_at}
            </ChannelName>
          </VideoLink>
        </VideoItem>
      ))}
    </VideosList>
  )

  const renderContent = () => {
    if (savedVideos.length === 0) {
      return (
        <EmptyContainer>
          <EmptyImage
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            alt="no saved videos"
          />

          <EmptyHeading dark={isDarkTheme}>No Saved Videos</EmptyHeading>

          <EmptyText dark={isDarkTheme}>
            You can save your videos while watching them
          </EmptyText>
        </EmptyContainer>
      )
    }

    return renderSavedVideos()
  }

  return (
    <SavedVideosContainer dark={isDarkTheme} data-testid="savedVideos">
      <Header isDarkTheme={isDarkTheme} onToggleTheme={onToggleTheme} />

      <BodyContainer>
        <Sidebar isDarkTheme={isDarkTheme} />

        <MainContainer>
          <Heading dark={isDarkTheme}>Saved Videos</Heading>

          {renderContent()}
        </MainContainer>
      </BodyContainer>
    </SavedVideosContainer>
  )
}

export default SavedVideos
