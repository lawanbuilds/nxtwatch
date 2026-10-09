import {useContext} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import Header from '../Header'
import Sidebar from '../Sidebar'
import NxtWatchContext from '../../context/NxtWatchContext'

const SavedVideosContainer = styled.div`
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

const Banner = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  margin-bottom: 28px;
  background-color: ${props => (props.$dark ? '#181818' : '#ebebeb')};
`

const BannerIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => (props.$dark ? '#000000' : '#d7dfe9')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff0000;
  font-size: 28px;
`

const BannerHeading = styled.h1`
  color: ${props => (props.$dark ? '#ffffff' : '#1e293b')};
  font-size: 28px;
  font-weight: bold;
  margin: 0;
`

const VideosList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const VideoItem = styled.li`
  min-width: 0;
`

const VideoLink = styled(Link)`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  text-decoration: none;

  @media screen and (max-width: 576px) {
    flex-direction: column;
  }
`

const Thumbnail = styled.img`
  width: 40%;
  max-width: 400px;
  display: block;
  flex-shrink: 0;

  @media screen and (max-width: 576px) {
    width: 100%;
    max-width: 100%;
  }
`

const VideoDetails = styled.div`
  min-width: 0;
`

const EmptyContainer = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;

  h1 {
    color: ${props => (props.$dark ? '#ffffff' : '#1e293b')};
  }

  p {
    color: ${props => (props.$dark ? '#cbd5e1' : '#64748b')};
  }
`

const EmptyImage = styled.img`
  width: 300px;
  max-width: 100%;
`

const SavedVideos = ({isDarkTheme: isDarkThemeProp, onToggleTheme}) => {
  const contextValue = useContext(NxtWatchContext) || {}
  const {savedVideosList = [], isDarkTheme: isDarkThemeContext} = contextValue

  const isDarkTheme = isDarkThemeContext ?? isDarkThemeProp ?? false

  const videos = Array.isArray(savedVideosList)
    ? savedVideosList
        .map(savedVideo => savedVideo.video_details || savedVideo)
        .filter(video => video && video.id)
    : []

  return (
    <SavedVideosContainer $dark={isDarkTheme} data-testid="savedVideos">
      <Header isDarkTheme={isDarkTheme} onToggleTheme={onToggleTheme} />

      <BodyContainer>
        <Sidebar isDarkTheme={isDarkTheme} />

        <MainContainer>
          {videos.length === 0 ? (
            <EmptyContainer $dark={isDarkTheme}>
              <EmptyImage
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                alt="no saved videos"
              />
              <h1>No saved videos found</h1>
              <p>You can save your videos while watching them</p>
            </EmptyContainer>
          ) : (
            <>
              <Banner $dark={isDarkTheme} data-testid="banner">
                <BannerIcon $dark={isDarkTheme} aria-hidden="true">
                  ▶
                </BannerIcon>
                <BannerHeading $dark={isDarkTheme}>Saved Videos</BannerHeading>
              </Banner>

              <VideosList>
                {videos.map(video => (
                  <VideoItem key={video.id}>
                    <VideoLink to={`/videos/${video.id}`}>
                      <Thumbnail
                        src={video.thumbnail_url}
                        alt="video thumbnail"
                      />

                      <VideoDetails>
                        <p>{video.title}</p>
                        <p>{video.channel?.name || video.channel_name || ''}</p>
                        <p>{video.view_count}</p>
                        <p>{video.published_at}</p>
                      </VideoDetails>
                    </VideoLink>
                  </VideoItem>
                ))}
              </VideosList>
            </>
          )}
        </MainContainer>
      </BodyContainer>
    </SavedVideosContainer>
  )
}

export default SavedVideos
