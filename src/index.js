import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import {NxtWatchProvider} from './context/NxtWatchContext'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <NxtWatchProvider>
        <App />
      </NxtWatchProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)
