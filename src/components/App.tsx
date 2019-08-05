import React from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader/root'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Container } from 'reactstrap'
import loadable from '@loadable/component'
// import delay from 'p-min-delay'
// @ts-ignore no @types avalabile

import Loader from './utils/Loader'

import { actions } from '../store/actions'

import Navigation from './Navigation'
import Footer, { CopyrightText } from './styled/Footer'
``
import { IState } from '../types/redux'
import { IAppActionProps, IAppProps } from '../types/react'
import { useUser } from '../common/hooks';

const FilmGroup = loadable(() => import(/* webpackPrefetch: true */ './FilmGroup'), {
  fallback: <Loader />
})
const Film = loadable(() => import(/* webpackPrefetch: true */ './Film'), {
  fallback: <Loader />
})

function App ({
  films,
  location,
  postUpdateFilm,
  updateFilm }: IAppProps) {
  const user = useUser()

  return <React.StrictMode>
    <Navigation url={location.pathname} />
    <main>
      <Container>
        <Switch>
          <Route
            exact
            path='/'
            render={(props) => <>
              <FilmGroup {...props} title='Favourites' />
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
          <Route
            path='/films/:id'
            render={(props) =>
              <Film
                {...props}
                update={postUpdateFilm}
                updateFilm={updateFilm}
                user={user}
                film={films.find((film) => (film._id && film._id.toString()) === props.match.params.id)}
              />
            }
          />
        </Switch>
      </Container>
    </main>
    <Footer>
      <CopyrightText>© Joe Smith 2019</CopyrightText>
    </Footer>
  </React.StrictMode>
}

function mapStateToProps ({ films, ...props }: IState & IAppActionProps): IAppProps {
  return {
    ...props,
    films
  }
}

export default hot(withRouter(connect(mapStateToProps, actions)(App)))
