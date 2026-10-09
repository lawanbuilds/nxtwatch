import {createContext, useEffect, useState} from 'react'

const NxtWatchContext = createContext({
  isDarkTheme: false,
  setIsDarkTheme: () => {},
  savedVideosList: [],
  toggleSavedVideo: () => {},
})

export default NxtWatchContext

const getSavedVideos = () => {
  try {
    const savedVideos = JSON.parse(localStorage.getItem('savedVideos') || '[]')

    if (Array.isArray(savedVideos)) {
      return savedVideos
    }

    return []
  } catch (error) {
    return []
  }
}

export const NxtWatchProvider = ({children}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [savedVideosList, setSavedVideosList] = useState(getSavedVideos)

  useEffect(() => {
    localStorage.setItem('savedVideosList', JSON.stringify(savedVideosList))
    localStorage.setItem('savedVideos', JSON.stringify(savedVideosList))
  }, [savedVideosList])

  const toggleSavedVideo = video => {
    setSavedVideosList(previousVideos => {
      const videoDetails = video.video_details || video
      const videoId = videoDetails.id

      const alreadySaved = previousVideos.some(
        item => (item.video_details || item).id === videoId,
      )

      if (alreadySaved) {
        return previousVideos.filter(
          item => (item.video_details || item).id !== videoId,
        )
      }

      return [...previousVideos, videoDetails]
    })
  }

  return (
    <NxtWatchContext.Provider
      value={{
        isDarkTheme,
        setIsDarkTheme,
        savedVideosList,
        toggleSavedVideo,
      }}
    >
      {children}
    </NxtWatchContext.Provider>
  )
}
