import React, { Component } from 'react'
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'
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
  Showtimes,
  ShowCol,
  ShowTime,
  ShowDate
} from './styled/Film'

function calculateDimensions (w) {
  const width = w >= 992 ? w * 0.7 : w < 576
    ? w - 20 : w * 0.9

  return {
    width,
    height: (9 / 16) * width
  }
}

function pad (num) {
  return num < 10 ? `0${num}` : num
}

function formatTime (date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`
}

class Film extends Component {
  constructor (props) {
    super(props)

    const date = new Date()

    const state = {
      modal: false,
      width: 640,
      height: 320,
      watchedForm: false,
      rating: 0,
      format: '2D',
      date: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDay())}`,
      time: formatTime(date),
      notes: ''
    }

    this.state = {
      ...state,
      ...props.film.watched
    }

    try {
      const { width, height } = calculateDimensions(window.innerWidth)
      this.state.width = width
      this.state.height = height
    } catch { }
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
    if (user && (!film.userData || (film.userData && film.userData.new !== false))) {
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
        map(() => this.createBody({ [type]: !(this.props.film.userData && this.props.film.userData[type]) })),
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

  submitForm = (ev) => {
    ev.preventDefault()

    const { rating, date, time, format, notes } = this.state

    this.props.update(this.createBody({ watched: {
      rating,
      format,
      dateTime: new Date(`${date} ${time}`),
      notes
    } }))

    this.setState({ watchedForm: false })
  }

  handleChange = (value) => {
    return (ev) => {
      this.setState({ [value]: ev.target.value })
    }
  }

  render () {
    const { film } = this.props
    const { width, height, watchedForm, rating, date, time, notes, format } = this.state

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
            <Icon icon='heart' type='favourite' title='Favourite film' favourite={film.userData && film.userData.favourite} />
            <Icon icon='eye' type='hidden' title='Visible in available' hiddenIcon={!(film.userData && film.userData.hidden)} />
          </div>
          <Synopsis>{film.synopsis}</Synopsis>
          {film.userData && film.userData.watched && (() => {
            const { dateTime, rating, notes, format } = film.userData.watched
            const date = new Date(dateTime)
            return <div>
              <p><strong>Watched: </strong>{date.toDateString()} at {formatTime(date)}</p>
              <p><strong>Rating: </strong>{rating}/100</p>
              <p><strong>Format: </strong>{format}</p>
              <p><strong>Notes: </strong>{notes}</p>
            </div>
          })()}
          {watchedForm && <Form onSubmit={this.submitForm}>
            <FormGroup>
              <Label for='rating'>Rating:</Label>
              <Input type='number' min='0' max='100' name='rating' value={rating} onChange={this.handleChange('rating')} />
            </FormGroup>
            <FormGroup>
              <Label for='format'>format:</Label>
              <Input type='select' name='format' value={format} onChange={this.handleChange('format')} >
                <option>2D</option>
                <option>3D</option>
                <option>IMAX</option>
                <option>IMAX 3D</option>
                <option>4DX</option>
                <option>4DX 3D</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col md={6}>
                  <Label for='date'>Date:</Label>
                  <Input type='date' name='date' value={date} onChange={this.handleChange('date')} />
                </Col>
                <Col md={6}>
                  <Label for='time'>Date:</Label>
                  <Input type='time' name='time' value={time} onChange={this.handleChange('time')} />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Label for='notes'>Notes:</Label>
              <Input type='textarea' name='notes' value={notes} onChange={this.handleChange('notes')} />
            </FormGroup>
            <Button type='submit' color='success'>Submit</Button>
          </Form>}
          {!watchedForm && (!film.userData || !film.userData.watched) &&
            <Button onClick={() => this.setState({ watchedForm: true })} color='success'>Watched!</Button>
          }
        </Col>
      </Row>
      {film.showtimes && <RowCenter>
        <Col>
          <Showtimes>Showtimes</Showtimes>
        </Col>
      </RowCenter>}
      {film.showtimes && <RowCenter>
        {Object.keys(film.showtimes).map((format) =>
          <ShowCol lg={4} md={12}>
            <h3>{format}</h3>
            {Object.keys(film.showtimes[format]).map((date) => {
              const today = new Date().toDateString() === date
              return <>
                <ShowDate today={today}>{date}</ShowDate>
                {film.showtimes[format][date].map((date) => {
                  // Mark as expired if show has been running for an hour
                  const expired = (Date.parse(date.time) + (60 * 60 * 1000)) < Date.now()
                  return <ShowTime
                    today={today}
                    expired={expired}
                    {...(expired ? {} : { href: date.url, target: '_blank' })}
                  >
                    {formatTime(new Date(date.time))}
                  </ShowTime>
                })}
              </>
            })}
          </ShowCol>
        )}
      </RowCenter>}
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
