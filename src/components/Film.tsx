import React, { Component, FormEvent } from 'react'
import { Row, Col, Button } from 'reactstrap'
import { fromEvent, Subscription } from 'rxjs'
import { pluck, debounceTime, tap, map } from 'rxjs/operators'
import YouTube from 'react-youtube'

import {
  RowCenter,
  PosterWrapper,
  Poster,
  PlayIcon,
  TrailerModal,
  Title,
  ReleaseDate,
  Icon,
  Synopsis,
  ShowtimesHeader
} from './styled/Film'

import Showtimes from './Showtimes'
import Watched from './Watched'
import WatchedForm from './WatchedForm'

import { calculateDimensions, notCheckUserData, checkUserData } from '../common/utils'
import { IFilmProps, IFilmState, IWatchedFormState } from '../types/react';
import { IFilm } from '../types/data';

class Film extends Component<IFilmProps, IFilmState> {
  constructor (props: IFilmProps) {
    super(props)

    const state = {
      modal: false,
      width: '640',
      height: '320',
      watchedForm: false
    }

    try {
      this.state = {
        ...state,
        ...calculateDimensions(window.innerWidth)
      }
    } catch {
      this.state = state
    }
  }

  resize: Subscription|null = null
  favourite: Subscription|null = null
  hidden: Subscription|null = null

  componentDidMount () {
    const { film, user, update } = this.props

    this.resize = fromEvent(window, 'resize')
      .pipe(
        debounceTime(500),
        pluck<Event, number>('target', 'innerWidth')
      )
      .subscribe((width: number) => {
        this.setState(calculateDimensions(width))
      })

    this.favourite = this.createIconEvent('favourite')
    this.hidden = this.createIconEvent('hidden')

    // Once viewied, remove new flag from film. Assuming signed in.
    if (user && film && notCheckUserData(film, (ud) => ud.new !== false)) {
      update(this.createBody({ new: false }))
    }
  }

  componentWillUnmount () {
    this.resize && this.resize.unsubscribe()
    this.favourite && this.favourite.unsubscribe()
    this.hidden && this.hidden.unsubscribe()
  }

  toggle = (): void => {
    this.setState((prevState) => ({
      modal: !prevState.modal
    }))
  }

  createIconEvent = (type: string): Subscription => {
    // return () => {
    //   this.props.updateFlag(this.createBody({ [type]: !checkUserData(this.props.film, type) }))
    // }
    return fromEvent(document.getElementById(`icon-${type}`) as HTMLElement, 'click')
      .pipe(
        map(() => this.createBody({ [type]: !checkUserData(this.props.film, type) })),
        tap((body) => this.props.updateFilm(body)),
        debounceTime(500)
      )
      .subscribe((body: IFilm) => {
        this.props.update(body)
      })
  }

  createBody = (data: IFilm): IFilm => {
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

  render () {
    const { film, match }: IFilmProps = this.props
    const { width, height, watchedForm }: IFilmState = this.state

    return !film
      ? <h1>Unable to find film with id: {match.params.id}</h1>
      : <>
      <Row>
        <Col
          lg={{ size: 4, offset: 0 }}
          md={{ size: 6, offset: 3 }}
          sm={{ size: 8, offset: 2 }}
        >
          <PosterWrapper onClick={this.toggle}>
            <Poster src={film.poster} />
            <PlayIcon />
          </PosterWrapper>
        </Col>
        <Col lg={8}>
          <Title>{film.title}</Title>
          <ReleaseDate>Release Date: {new Date(film.dateAdded as string).toDateString()}</ReleaseDate>
          <div className='mt-3'>
            {/* <Icon onClick={this.createIconEvent('favourite')} icon='heart' title='Favourite film' favourite={checkUserData(film, 'favourite')} />
            <Icon onClick={this.createIconEvent('hidden')} icon='eye' title='Visible in available' hiddenIcon={!checkUserData(film, 'hidden')} /> */}
            <Icon type='favourite' icon='heart' title='Favourite film' favourite={checkUserData(film, 'favourite')} />
            <Icon type='hidden' icon='eye' title='Visible in available' hiddenIcon={!checkUserData(film, 'hidden')} />
          </div>
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
      <TrailerModal width={width} isOpen={this.state.modal} toggle={this.toggle} centered>
        <YouTube
          opts={{ width, height }}
          videoId={film.trailer && film.trailer.slice(film.trailer.indexOf('=') + 1, film.trailer.length)}
        />
      </TrailerModal>
    </>
  }
}

export default Film
