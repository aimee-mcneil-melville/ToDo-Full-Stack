import React from 'react'
import { render } from 'react-dom'
import { hashHistory, IndexRoute, Route, Router } from 'react-router'

import App from './components/App'
import Items from './components/Items'
import SimpleItems from './components/SimpleItems'
import UncontrolledItems from './components/UncontrolledItems'

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Items} />
        <Route path="simple" component={SimpleItems} />
        <Route path="uncontrolled" component={UncontrolledItems} />
      </Route>
    </Router>,
    document.getElementById('app')
  )
})
