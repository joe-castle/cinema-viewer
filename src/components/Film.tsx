import React, { Component, FormEvent } from 'react'
import { Row, Col, Button } from 'reactstrap'
import loadable, { LoadableComponent } from '@loadable/component'

import {
  RowCenter,
  PosterWrapper,
  Poster,
  PlayIcon,
  Title,
  SubInfo,
  // Icon,
  Synopsis,
  ShowtimesHeader
} from './styled/Film'

import Showtimes from './Showtimes'
import Watched from './Watched'
import Loader from './utils/Loader'

import { notCheckUserData, checkUserData, formatDate } from '../common/utils'
import { IFilmProps, IFilmState, IWatchedFormState, ITrailerModalProps, IWatchedFormProps } from '../types/react'
import { IUserData } from '../types/data'
import Icon from './Icon';

const fallback = {
  fallback: <Loader />
}

const TrailerModal: LoadableComponent<ITrailerModalProps> = loadable(() => import(/* webpackPrefetch: true */ './TrailerModal'), fallback)
const WatchedForm: LoadableComponent<IWatchedFormProps> = loadable(() => import(/* webpackPrefetch: true */ './WatchedForm'), fallback)

class Film extends Component<IFilmProps, IFilmState> {
  constructor (props: IFilmProps) {
    super(props)

    this.state = {
      watchedForm: false,
      modal: false
    }
  }

  componentDidMount () {
    const { film, user, update } = this.props

    // Once viewied, remove new flag from film. Assuming signed in.
    if (user && film && notCheckUserData(film, (ud) => ud.new !== false)) {
      update(this.createBody({ new: false }))
    }
  }

  createBody = (data: IUserData): IUserData => {
    // @ts-ignore impossible to call this function if film is missing
    return { _id: this.props.film._id, ...data }
  }

  submitForm = (ev: FormEvent<HTMLFrameElement>, state: IWatchedFormState): void => {
    ev.preventDefault()

    const { rating, date, time, format, notes } = state

    this.props.update(this.createBody({ watched: {
      rating,
      format,
      dateTime: new Date(`${date} ${time}`),
      notes
    } }))

    this.setState({ watchedForm: false })
  }

  generateSubInfo = (...info: (string|undefined)[]) => {
    return info.filter(Boolean).join(' | ')
  }

  toggleModal = (): void => {
    this.setState((prevState) => ({
      modal: !prevState.modal
    }))
  }

  iconOnClick = (type: string): (ev: MouseEvent) => void => {
    // @ts-ignore impossible to call this function if film is missing
    return (ev) => this.props.update(this.createBody({ [type]: !checkUserData(this.props.film, type) }))
  }

  render () {
    const { film, match }: IFilmProps = this.props
    const { watchedForm, modal }: IFilmState = this.state

    return !film
      ? <h1>Unable to find film with id: {match.params.id}</h1>
      : <>
      <Row>
        <Col
          lg={{ size: 4, offset: 0 }}
          md={{ size: 6, offset: 3 }}
          sm={{ size: 8, offset: 2 }}
        >
          <PosterWrapper onClick={this.toggleModal}>
            <Poster src={film.poster} />
            <PlayIcon />
          </PosterWrapper>
        </Col>
        <Col lg={8}>
          <Title>{film.title}</Title>
          <SubInfo>{this.generateSubInfo(film.rating, film.length, formatDate(new Date(film.dateAdded as string)))}</SubInfo>
          <div className='mt-3 mb-3'>
            {/* <Icon onClick={this.createIconEvent('favourite')} icon='heart' title='Favourite film' favourite={checkUserData(film, 'favourite')} />
            <Icon onClick={this.createIconEvent('hidden')} icon='eye' title='Visible in available' hiddenIcon={!checkUserData(film, 'hidden')} /> */}
            <Icon
              onClick={this.iconOnClick('favourite')}
              type='favourite'
              icon='heart'
              title='Favourite film'
              color='red'
              highlight={checkUserData(film, 'favourite')}
              loading={film.userData && film.userData.favourite === 'loading'} />
            <Icon
              onClick={this.iconOnClick('hidden')}
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
          {watchedForm && <WatchedForm submitForm={this.submitForm} />}
          {!watchedForm && !notCheckUserData(film, 'watched') &&
            <Button onClick={() => this.setState({ watchedForm: true })} color='success'>Watched!</Button>
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
        toggle={this.toggleModal}
        open={modal}
        trailer={film.trailer}
      />
    </>
  }
}

export default Film
