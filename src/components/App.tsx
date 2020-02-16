import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom'
import { Container } from 'reactstrap'
import loadable from '@loadable/component'
// import delay from 'p-min-delay'

import Navigation from './Navigation'
import Footer, { CopyrightText } from './styled/Footer'

import { fallback } from '../common/utils';
import BulkSelector from './BulkSelector'

const FilmGroup = loadable(() => import(/* webpackPrefetch: true */ './FilmGroup'), fallback)
const Film = loadable(() => import(/* webpackPrefetch: true */ './Film'), fallback)

function App ({ location }: RouteComponentProps) {
  return <React.StrictMode>
    <Navigation url={location.pathname} />
    <main>
      <Container>
        {!/^\/films\/.+$/.test(location.pathname) && <BulkSelector />}
        <Switch>
          <Route
            exact
            path='/'
            render={(props) => <>
              <FilmGroup {...props} title='Watch List' />
              <FilmGroup {...props} title='Available' />
              <FilmGroup {...props} title='Hidden' collapse />
            </>}
          />
          <Route
            exact
            path='/films'
            render={(props) => <>
              <FilmGroup {...props} title='Watched' />
              <FilmGroup {...props} title='Expired' collapse />
            </>}
          />
          <Route path='/films/:id' component={Film} />
        </Switch>
      </Container>
    </main>
    <Footer>
      <CopyrightText>© Joe Smith 2019</CopyrightText>
    </Footer>
  </React.StrictMode>
}

export default hot(withRouter(App))
