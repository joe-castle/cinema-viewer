import React, { FormEvent, useState, useEffect } from 'react'
import { Row, Col, Button } from 'reactstrap'
import loadable from '@loadable/component'

import {
  RowCenter,
  PosterWrapper,
  Poster,
  LargeIcon,
  Title,
  SubInfo,
  // Icon,
  Synopsis,
  ShowtimesHeader
} from './styled/Film'

import Showtimes from './Showtimes'
import Watched from './Watched'

import { notCheckUserData, checkUserData, formatDate, fallback } from '../common/utils'
import { IUserData, IFilm } from '../types/data'
import Icon from './Icon';
import { RouteComponentProps } from 'react-router';
import { IState } from '../types/redux';
import { useSelector, useDispatch } from 'react-redux';
import { useUser } from '../common/hooks';
import { filmActions } from '../store/actions/films';
import { IWatchedFormState } from './WatchedForm';

export interface IFilmRouteProps {
  id?: string
}

const TrailerModal = loadable(() => import(/* webpackPrefetch: true */ './TrailerModal'), fallback)
const WatchedForm = loadable(() => import(/* webpackPrefetch: true */ './WatchedForm'), fallback)

function generateSubInfo (...info: (string|undefined)[]) {
  return info.filter(Boolean).join(' | ')
}

export default function Film({ match }: RouteComponentProps<IFilmRouteProps>) {
  const [watchedForm, setWatchedForm] = useState(false)
  const [trailerModal, setTrailerModal] = useState(false)

  const user = useUser()
  const film = useSelector<IState, IFilm|undefined>(({ films }) => 
    films.find((film) => (film._id && film._id.toString()) === match.params.id))

  const dispatch = useDispatch()

  useEffect(() => {
    if (user && film && notCheckUserData(film, (ud) => ud.new !== false)) {
      updateFilmUserData({ new: false })
    }
  })

  /**
   * Dispatches an action to the Redux store to update the UserData for this film
   */
  function updateFilmUserData(userData: IUserData) {
    dispatch(filmActions.postUpdateFilm({
      // @ts-ignore impossible to call this function if film is missing
      ...{ _id: film._id },
      ...userData
    }))
  }

  function submitWatchedForm(
    ev: FormEvent<HTMLFormElement>, 
    { rating, format, date, time, notes}: IWatchedFormState) {
    ev.preventDefault()

    updateFilmUserData({ 
      favourite: false,
      watched: {
        rating,
        format,
        dateTime: new Date(`${date} ${time}`),
        notes
      } 
    })

    setWatchedForm(false)
  }
    
  return !film
    ? <h1>Unable to find film with id: {match.params.id}</h1>
    : <>
    <Row>
      <Col
        lg={{ size: 4, offset: 0 }}
        md={{ size: 6, offset: 3 }}
        sm={{ size: 8, offset: 2 }}
      >
        <PosterWrapper onClick={() => setTrailerModal(!trailerModal)}>
          <Poster src={film.poster} />
          {/*
          // @ts-ignore */ }
          <LargeIcon type={'play-circle'} />
        </PosterWrapper>
      </Col>
      <Col lg={8}>
        <Title>{film.title}</Title>
        <SubInfo>{generateSubInfo(film.rating, film.length, formatDate(new Date(film.dateAdded as string)))}</SubInfo>
        <div className='mt-3 mb-3'>
          <Icon
            onClick={() => updateFilmUserData({ favourite: !checkUserData(film, 'favourite') })}
            type='favourite'
            icon='heart'
            title='Watch List'
            color='red'
            highlight={checkUserData(film, 'favourite')}
            loading={film.userData && film.userData.favourite === 'loading'} />
          <Icon
            onClick={() => updateFilmUserData({ hidden: !checkUserData(film, 'hidden') })}
            type='hidden'
            icon='eye'
            title='Visible in available'
            color='green'
            highlight={!checkUserData(film, 'hidden')}
            loading={film.userData && film.userData.hidden === 'loading'} />
        </div>
        {film.director && <><strong>Director: </strong><p>{film.director}</p></>}
        {film.cast && <><strong>Cast: </strong><p>{film.cast}</p></>}
        <Synopsis>{film.synopsis}</Synopsis>
        {/* 
          // @ts-ignore undefined checked performed by checkUSerData */}
        {checkUserData(film, 'watched') && <Watched watched={film.userData.watched} />}
        {watchedForm && <WatchedForm submitWatchedForm={submitWatchedForm} />}
        {!watchedForm && !notCheckUserData(film, 'watched') &&
          <Button onClick={() => setWatchedForm(true)} color='success'>Watched!</Button>
        }
      </Col>
    </Row>
    {film.showtimes && <RowCenter>
      <Col>
        <ShowtimesHeader>Showtimes</ShowtimesHeader>
      </Col>
    </RowCenter>}
    {film.showtimes && <Showtimes showtimes={film.showtimes} />}
    <TrailerModal
      toggle={() => setTrailerModal(!trailerModal)}
      open={trailerModal}
      trailer={film.trailer}
    />
  </>
}
