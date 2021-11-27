import './public/global.less'
import loadable from '@loadable/component'
import { HashRouter, Switch, Route } from 'react-router-dom'
import routes from './routes'

// 组件按需加载(Code Spliting)
const Layout = loadable(() => import('./components/Layout/Layout'))

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('uiStore')
@observer
export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route
            path="/"
            render={props => <Layout route={routes} {...props} />}
          />
        </Switch>
      </HashRouter>
    )
  }
}
