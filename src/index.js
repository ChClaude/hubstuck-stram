import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css'
import './styles/nav.css'
import './styles/ui-card.css'

import { HashRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import store from './stores/store'

const render = () => {
  ReactDOM.render(
    <HashRouter>
      <App/>
    </HashRouter>,
    document.getElementById('root')
  )
  console.log('rendered with state', store.getState())
}
render()

store.subscribe(render)


registerServiceWorker()
