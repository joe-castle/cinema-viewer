import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap'
import { fromEvent } from 'rxjs'
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
import Watched from './watched'
import WatchedForm from './WatchedForm'

import { calculateDimensions, notCheckUserData, checkUserData } from '../utils'

class Film extends Component {
  constructor (props) {
    super(props)

    const state = {
      modal: false,
      width: 640,
      height: 320,
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

  componentDidMount () {
    const { film, user, update } = this.props

    this.resize = fromEvent(window, 'resize')
      .pipe(
        debounceTime(500),
        pluck('target', 'innerWidth')
      )
      .subscribe((width) => {
        this.setState(calculateDimensions(width))
      })

    this.favourite = this.createIconEvent('favourite')
    this.hidden = this.createIconEvent('hidden')

    // Once viewied, remove new flag from film. Assuming signed in.
    if (user && notCheckUserData(film, (ud) => ud.new !== false)) {
      update(this.createBody({ new: false }))
    }
  }

  componentWillUnmount () {
    this.resize.unsubscribe()
    this.favourite.unsubscribe()
    this.hidden.unsubscribe()
  }

  toggle = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal
    }))
  }

  createIconEvent = (type) => {
    return fromEvent(document.getElementById(`icon-${type}`), 'click')
      .pipe(
        map(() => this.createBody({ [type]: !checkUserData(this.props.film, type) })),
        tap((body) => this.props.updateFilm(body)),
        debounceTime(500)
      )
      .subscribe((body) => {
        this.props.update(body)
      })
  }

  createBody = (data) => {
    return { id: this.props.film._id, ...data }
  }

  submitForm = (ev, state) => {
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
    const { film } = this.props
    const { width, height, watchedForm } = this.state

    return <>
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
          <ReleaseDate>Release Date: {new Date(film.dateAdded).toDateString()}</ReleaseDate>
          <div className='mt-3'>
            <Icon icon='heart' type='favourite' title='Favourite film' favourite={checkUserData(film, 'favourite')} />
            <Icon icon='eye' type='hidden' title='Visible in available' hiddenIcon={!checkUserData(film, 'hidden')} />
          </div>
          <Synopsis>{film.synopsis}</Synopsis>
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
          videoId={film.trailer.slice(film.trailer.indexOf('=') + 1, film.trailer.length)}
        />
      </TrailerModal>
    </>
  }
}

export default Film
