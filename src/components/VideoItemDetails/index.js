import {useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import Cookies from 'js-cookie'
import styled from 'styled-components'
import ReactPlayer from 'react-player'
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from 'react-icons/ai'
import {RiPlayListAddLine} from 'react-icons/ri'
import Header from '../Header'
import Sidebar from '../Sidebar'

const PageContainer = styled.div`
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

const VideoContainer = styled.div`
  width: 100%;
  max-width: 1000px;
`

const PlayerContainer = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: #000000;
  overflow: hidden;
`

const StyledReactPlayer = styled(ReactPlayer)`
  width: 100% !important;
  height: 100% !important;
`

const VideoTitle = styled.h1`
  color: ${props => (props.$dark ? '#ffffff' : '#1e293b')};
  font-size: 24px;
  font-weight: 500;
  line-height: 1.4;
  margin: 20px 0 12px;

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`

const VideoInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${props => (props.$dark ? '#424242' : '#e2e8f0')};

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`

const ViewText = styled.p`
  color: ${props => (props.$dark ? '#94a3b8' : '#64748b')};
  margin: 0;
  font-size: 14px;
`

const ActionsContainer = styled.div`
  display: flex;
  gap: 24px;

  @media screen and (max-width: 480px) {
    width: 100%;
    justify-content: space-between;
    gap: 12px;
  }
`

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  border: none;
  background-color: transparent;
  color: ${props => {
    if (props.$active) {
      return '#2563eb'
    }

    if (props.$dark) {
      return '#94a3b8'
    }

    return '#64748b'
  }};
  cursor: pointer;
  font-size: 16px;
  padding: 4px;

  @media screen and (max-width: 480px) {
    font-size: 14px;
  }
`

const ChannelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid ${props => (props.$dark ? '#424242' : '#e2e8f0')};
`

const ChannelLogo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;

  @media screen and (max-width: 480px) {
    width: 44px;
    height: 44px;
  }
`

const ChannelName = styled.p`
  color: ${props => (props.$dark ? '#ffffff' : '#1e293b')};
  font-weight: 600;
  margin: 0;
`

const Description = styled.p`
  color: ${props => (props.$dark ? '#cbd5e1' : '#475569')};
  line-height: 1.6;
  font-size: 15px;
  margin-top: 24px;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
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
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const VideoItemDetails = ({isDarkTheme, onToggleTheme}) => {
  const {id} = useParams()

  const [videoDetails, setVideoDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFailure, setIsFailure] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const getVideoDetails = useCallback(async () => {
    setIsLoading(true)
    setIsFailure(false)

    const jwtToken = Cookies.get('jwt_token')

    try {
      const response = await fetch(`https://apis.ccbp.in/videos/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        const currentVideo = data.video_details

        setVideoDetails(currentVideo)

        const savedVideos = JSON.parse(
          localStorage.getItem('savedVideos') || '[]',
        )

        const alreadySaved = savedVideos.some(
          video => video.id === currentVideo.id,
        )

        setIsSaved(alreadySaved)
        setIsLoading(false)
      } else {
        setIsFailure(true)
        setIsLoading(false)
      }
    } catch (error) {
      setIsFailure(true)
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    getVideoDetails()
  }, [getVideoDetails])

  const onClickLike = () => {
    setIsLiked(prevState => !prevState)
    setIsDisliked(false)
  }

  const onClickDislike = () => {
    setIsDisliked(prevState => !prevState)
    setIsLiked(false)
  }

  const onClickSave = () => {
    if (!videoDetails) {
      return
    }

    const savedVideos = JSON.parse(localStorage.getItem('savedVideos') || '[]')

    if (isSaved) {
      const updatedVideos = savedVideos.filter(
        video => video.id !== videoDetails.id,
      )

      localStorage.setItem('savedVideos', JSON.stringify(updatedVideos))

      setIsSaved(false)
    } else {
      const alreadySaved = savedVideos.some(
        video => video.id === videoDetails.id,
      )

      if (!alreadySaved) {
        const updatedVideos = [...savedVideos, videoDetails]

        localStorage.setItem('savedVideos', JSON.stringify(updatedVideos))
      }

      setIsSaved(true)
    }
  }

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

          <RetryButton type="button" onClick={getVideoDetails}>
            Retry
          </RetryButton>
        </FailureContainer>
      )
    }

    return (
      <VideoContainer>
        <PlayerContainer>
          <StyledReactPlayer
            url={videoDetails.video_url}
            controls
            light={videoDetails.thumbnail_url}
          />
        </PlayerContainer>

        <VideoTitle $dark={isDarkTheme}>{videoDetails.title}</VideoTitle>

        <VideoInfo>
          <ViewText $dark={isDarkTheme}>
            {videoDetails.view_count} views •{' '}
            {formatDistanceToNow(new Date(videoDetails.published_at), {
              addSuffix: true,
            })}
          </ViewText>

          <ActionsContainer>
            <ActionButton
              type="button"
              $active={isLiked}
              $dark={isDarkTheme}
              onClick={onClickLike}
            >
              {isLiked ? <AiFillLike /> : <AiOutlineLike />}
              Like
            </ActionButton>

            <ActionButton
              type="button"
              $active={isDisliked}
              $dark={isDarkTheme}
              onClick={onClickDislike}
            >
              {isDisliked ? <AiFillDislike /> : <AiOutlineDislike />}
              Dislike
            </ActionButton>

            <ActionButton
              type="button"
              $active={isSaved}
              $dark={isDarkTheme}
              onClick={onClickSave}
            >
              <RiPlayListAddLine />
              {isSaved ? 'Saved' : 'Save'}
            </ActionButton>
          </ActionsContainer>
        </VideoInfo>

        <ChannelContainer $dark={isDarkTheme}>
          <ChannelLogo
            src={videoDetails.channel.profile_image_url}
            alt="channel logo"
          />

          <ChannelName $dark={isDarkTheme}>
            {videoDetails.channel.name}
          </ChannelName>
        </ChannelContainer>

        <Description $dark={isDarkTheme}>
          {videoDetails.description}
        </Description>
      </VideoContainer>
    )
  }

  return (
    <PageContainer $dark={isDarkTheme} data-testid="videoItemDetails">
      <Header isDarkTheme={isDarkTheme} onToggleTheme={onToggleTheme} />

      <BodyContainer>
        <Sidebar isDarkTheme={isDarkTheme} />

        <MainContainer>{renderContent()}</MainContainer>
      </BodyContainer>
    </PageContainer>
  )
}

export default VideoItemDetails
