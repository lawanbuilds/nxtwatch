import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
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
  display: block;
  text-decoration: none;
`

const Thumbnail = styled.img`
  width: 100%;
  display: block;
`

const ChannelName = styled.p`
  color: ${props => (props.dark ? '#94a3b8' : '#64748b')};
  font-size: 14px;
  margin: 8px 0;
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

            {/* Test expects title inside paragraph */}
            <p>{video.title}</p>

            <ChannelName dark={isDarkTheme}>{video.channel.name}</ChannelName>

            {/* Test expects view_count inside paragraph */}
            <p>{video.view_count}</p>

            {/* Test expects published_at inside paragraph */}
            <p>{video.published_at}</p>
          </VideoLink>
        </VideoItem>
      ))}
    </VideosList>
  )

  return (
    <SavedVideosContainer dark={isDarkTheme}>
      <Header isDarkTheme={isDarkTheme} onToggleTheme={onToggleTheme} />

      <BodyContainer>
        <Sidebar isDarkTheme={isDarkTheme} />

        <MainContainer>
          {/* IMPORTANT: plain HTML h1 */}
          <h1>Saved Videos</h1>

          {savedVideos.length === 0 ? (
            <EmptyContainer>
              <EmptyImage
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                alt="no saved videos"
              />

              <h1>No saved videos found</h1>

              <p>You can save your videos while watching them</p>
            </EmptyContainer>
          ) : (
            renderSavedVideos()
          )}
        </MainContainer>
      </BodyContainer>
    </SavedVideosContainer>
  )
}

export default SavedVideos
