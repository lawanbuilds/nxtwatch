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

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  const onToggleTheme = () => {
    setIsDarkTheme(prevState => !prevState)
  }

  return (
    <div className={isDarkTheme ? 'dark-theme' : 'light-theme'}>
      <Switch>
        <Route exact path="/login" component={Login} />

        <ProtectedRoute
          exact
          path="/"
          render={() => (
            <Home isDarkTheme={isDarkTheme} onToggleTheme={onToggleTheme} />
          )}
        />

        <ProtectedRoute
          exact
          path="/trending"
          render={() => (
            <Trending isDarkTheme={isDarkTheme} onToggleTheme={onToggleTheme} />
          )}
        />

        <ProtectedRoute
          exact
          path="/gaming"
          render={() => (
            <Gaming isDarkTheme={isDarkTheme} onToggleTheme={onToggleTheme} />
          )}
        />

        <ProtectedRoute
          exact
          path="/saved-videos"
          render={() => (
            <SavedVideos
              isDarkTheme={isDarkTheme}
              onToggleTheme={onToggleTheme}
            />
          )}
        />

        <ProtectedRoute
          exact
          path="/videos/:id"
          render={() => (
            <VideoItemDetails
              isDarkTheme={isDarkTheme}
              onToggleTheme={onToggleTheme}
            />
          )}
        />

        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default App
