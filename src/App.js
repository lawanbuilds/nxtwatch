import './App.css'

import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route exact path="/trending" component={Trending} />
    <Route exact path="/gaming" component={Gaming} />
    <Route exact path="/saved-videos" component={SavedVideos} />
    <Route exact path="/videos/:id" component={VideoItemDetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
