import {useState} from 'react'
import './App.css'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import NxtWatchContext from './context/NxtWatchContext'

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [savedVideosList, setSavedVideosList] = useState([])

  const onToggleTheme = () => {
    setIsDarkTheme(prevState => !prevState)
  }

  const addSavedVideo = videoDetails => {
    setSavedVideosList(prevList => {
      const isAlreadySaved = prevList.some(item => item.id === videoDetails.id)
      if (isAlreadySaved) {
        return prevList.filter(item => item.id !== videoDetails.id)
      }
      return [...prevList, videoDetails]
    })
  }

  return (
    <NxtWatchContext.Provider
      value={{
        isDarkTheme,
        savedVideosList,
        toggleTheme: onToggleTheme,
        addSavedVideo,
      }}
    >
      <div className={isDarkTheme ? 'dark-theme' : 'light-theme'}>
        <Switch>
          <Route exact path="/login" component={Login} />

          <ProtectedRoute
            exact
            path="/"
            render={props => (
              <Home
                {...props}
                isDarkTheme={isDarkTheme}
                onToggleTheme={onToggleTheme}
              />
            )}
          />

          <ProtectedRoute
            exact
            path="/trending"
            render={props => (
              <Trending
                {...props}
                isDarkTheme={isDarkTheme}
                onToggleTheme={onToggleTheme}
              />
            )}
          />

          <ProtectedRoute
            exact
            path="/gaming"
            render={props => (
              <Gaming
                {...props}
                isDarkTheme={isDarkTheme}
                onToggleTheme={onToggleTheme}
              />
            )}
          />

          <ProtectedRoute
            exact
            path="/saved-videos"
            render={props => (
              <SavedVideos
                {...props}
                isDarkTheme={isDarkTheme}
                onToggleTheme={onToggleTheme}
              />
            )}
          />

          <ProtectedRoute
            exact
            path="/videos/:id"
            render={props => (
              <VideoItemDetails
                {...props}
                isDarkTheme={isDarkTheme}
                onToggleTheme={onToggleTheme}
              />
            )}
          />

          <Route component={NotFound} />
        </Switch>
      </div>
    </NxtWatchContext.Provider>
  )
}

export default App
