import {useState, useEffect, useCallback} from 'react'

import {Link} from 'react-router-dom'

import {formatDistanceToNow} from 'date-fns'

import Cookies from 'js-cookie'

import styled from 'styled-components'

import {FiSearch, FiX} from 'react-icons/fi'

import Header from '../Header'

import Sidebar from '../Sidebar'

const HomeContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => (props.dark ? '#181818' : '#f9f9f9')};
  color: ${props => (props.dark ? '#ffffff' : '#000000')};
`

const MainContainer = styled.div`
  display: flex;
`

const ContentContainer = styled.main`
  flex: 1;
  min-width: 0;
  padding: 32px;

  @media screen and (max-width: 768px) {
    padding: 20px;
  }
`

const Banner = styled.div`
  position: relative;
  padding: 32px;
  min-height: 220px;
  background-color: ${props => (props.dark ? '#212121' : '#ffffff')};
  background-image: ${props =>
    props.dark
      ? 'none'
      : 'url(https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png)'};
  background-size: cover;
  background-position: center;

  @media screen and (max-width: 768px) {
    padding: 24px;
    min-height: 190px;
  }
`

const BannerLogo = styled.img`
  width: 150px;

  @media screen and (max-width: 768px) {
    width: 120px;
  }
`

const BannerText = styled.p`
  max-width: 500px;
  color: ${props => (props.dark ? '#ffffff' : '#000000')};
  font-size: 28px;

  @media screen and (max-width: 768px) {
    max-width: 300px;
    font-size: 20px;
    line-height: 1.4;
  }
`

const GetItButton = styled.button`
  padding: 10px 18px;
  background-color: transparent;
  border: 1px solid ${props => (props.dark ? '#ffffff' : '#000000')};
  color: ${props => (props.dark ? '#ffffff' : '#000000')};
  cursor: pointer;
`

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  background-color: transparent;
  color: ${props => (props.dark ? '#ffffff' : '#000000')};
  font-size: 24px;
  cursor: pointer;
`

const SearchContainer = styled.div`
  display: flex;
  margin: 32px 0;
  max-width: 600px;
`

const SearchInput = styled.input`
  flex: 1;
  min-width: 0;
  padding: 12px;
  border: 1px solid #94a3b8;
  background-color: ${props => (props.dark ? '#212121' : '#ffffff')};
  color: ${props => (props.dark ? '#ffffff' : '#000000')};
`

const SearchButton = styled.button`
  width: 60px;
  flex-shrink: 0;
  border: 1px solid #94a3b8;
  background-color: ${props => (props.dark ? '#424242' : '#f1f5f9')};
  color: ${props => (props.dark ? '#ffffff' : '#000000')};
  cursor: pointer;
`

const VideosList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px 24px;
  padding: 0;
  margin: 0;
  list-style: none;

  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`

const VideoCard = styled.li`
  min-width: 0;
`

const VideoLink = styled(Link)`
  text-decoration: none;
`

const Thumbnail = styled.img`
  width: 100%;
  display: block;
`

const VideoInfoContainer = styled.div`
  display: flex;
  margin-top: 12px;
`

const ChannelLogo = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 12px;
  flex-shrink: 0;
`

const VideoContent = styled.div`
  flex: 1;
  min-width: 0;
`

const VideoTitle = styled.p`
  color: ${props => (props.dark ? '#ffffff' : '#000000')};
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
  margin: 0 0 8px;

  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`

const ChannelName = styled.p`
  color: ${props => (props.dark ? '#94a3b8' : '#64748b')};
  font-size: 14px;
  margin: 0 0 6px;
`

const VideoMeta = styled.p`
  color: ${props => (props.dark ? '#94a3b8' : '#64748b')};
  font-size: 13px;
  margin: 0;
`

const ContentText = styled.p`
  color: ${props => (props.dark ? '#ffffff' : '#475569')};
`

const ContentHeading = styled.h1`
  color: ${props => (props.dark ? '#ffffff' : '#000000')};
`

const LoaderContainer = styled.div`
  min-height: 300px;
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
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
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

const EmptyContainer = styled.div`
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
`

const EmptyImage = styled.img`
  width: 300px;
  max-width: 100%;
`

const Home = ({isDarkTheme, onToggleTheme}) => {
  const [showBanner, setShowBanner] = useState(true)
  const [searchInput, setSearchInput] = useState('')
  const [searchText, setSearchText] = useState('')
  const [videos, setVideos] = useState([])
  const [apiStatus, setApiStatus] = useState('initial')

  const getVideos = useCallback(async () => {
    setApiStatus('loading')

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchText}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(url, options)

      if (response.ok) {
        const data = await response.json()
        setVideos(data.videos)
        setApiStatus('success')
      } else {
        setApiStatus('failure')
      }
    } catch (error) {
      setApiStatus('failure')
    }
  }, [searchText])

  useEffect(() => {
    getVideos()
  }, [getVideos])

  const onSearch = () => {
    setSearchText(searchInput)
  }

  const renderVideos = () => {
    if (apiStatus === 'loading') {
      return (
        <LoaderContainer data-testid="loader">
          <Loader />
        </LoaderContainer>
      )
    }

    if (apiStatus === 'failure') {
      return (
        <FailureContainer>
          <FailureImage
            src={
              isDarkTheme
                ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
            }
            alt="failure view"
          />

          <ContentHeading dark={isDarkTheme}>
            Oops! Something Went Wrong
          </ContentHeading>

          <ContentText dark={isDarkTheme}>
            We are having some trouble to complete your request.
          </ContentText>

          <RetryButton type="button" onClick={getVideos}>
            Retry
          </RetryButton>
        </FailureContainer>
      )
    }

    if (videos.length === 0) {
      return (
        <EmptyContainer>
          <EmptyImage
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no videos"
          />

          <ContentHeading dark={isDarkTheme}>
            No Search results found
          </ContentHeading>

          <ContentText dark={isDarkTheme}>
            Try different key words or remove search filter
          </ContentText>

          <RetryButton type="button" onClick={getVideos}>
            Retry
          </RetryButton>
        </EmptyContainer>
      )
    }

    return (
      <VideosList>
        {videos.map(video => (
          <VideoCard key={video.id}>
            <VideoLink to={`/videos/${video.id}`}>
              <Thumbnail src={video.thumbnail_url} alt="video thumbnail" />

              <VideoInfoContainer>
                <ChannelLogo
                  src={video.channel.profile_image_url}
                  alt="channel logo"
                />

                <VideoContent>
                  <VideoTitle dark={isDarkTheme}>{video.title}</VideoTitle>

                  <ChannelName dark={isDarkTheme}>
                    {video.channel.name}
                  </ChannelName>

                  <VideoMeta dark={isDarkTheme}>
                    {video.view_count} views •{' '}
                    {formatDistanceToNow(new Date(video.published_at), {
                      addSuffix: true,
                    })}
                  </VideoMeta>
                </VideoContent>
              </VideoInfoContainer>
            </VideoLink>
          </VideoCard>
        ))}
      </VideosList>
    )
  }

  return (
    <HomeContainer dark={isDarkTheme} data-testid="home">
      <Header isDarkTheme={isDarkTheme} onToggleTheme={onToggleTheme} />

      <MainContainer>
        <Sidebar isDarkTheme={isDarkTheme} />

        <ContentContainer>
          {showBanner && (
            <Banner dark={isDarkTheme} data-testid="banner">
              <BannerLogo
                src={
                  isDarkTheme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                }
                alt="nxt watch logo"
              />

              <BannerText dark={isDarkTheme}>
                Buy Nxt Watch Premium prepaid plans with UPI
              </BannerText>

              <GetItButton dark={isDarkTheme}>GET IT NOW</GetItButton>

              <CloseButton
                dark={isDarkTheme}
                type="button"
                data-testid="close"
                onClick={() => setShowBanner(false)}
              >
                <FiX />
              </CloseButton>
            </Banner>
          )}

          <SearchContainer>
            <SearchInput
              dark={isDarkTheme}
              type="search"
              value={searchInput}
              onChange={event => setSearchInput(event.target.value)}
              placeholder="Search"
            />

            <SearchButton
              dark={isDarkTheme}
              type="button"
              data-testid="searchButton"
              onClick={onSearch}
            >
              <FiSearch />
            </SearchButton>
          </SearchContainer>

          {renderVideos()}
        </ContentContainer>
      </MainContainer>
    </HomeContainer>
  )
}

export default Home
