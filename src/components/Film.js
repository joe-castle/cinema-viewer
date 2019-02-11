import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import { fromEvent } from 'rxjs'
import { pluck, debounceTime } from 'rxjs/operators'
import YouTube from 'react-youtube'

import {
  RowCenter,
  ImgTrailer,
  Img,
  Icon,
  TrailerModal,
  Title,
  ReleaseDate,
  Synopsis,
  Showtimes,
  ShowCol,
  ShowTime,
  ShowDate
} from './styled/Film'

class Film extends Component {
  constructor (props) {
    super(props)

    this.state = {
      modal: false,
      width: 640,
      height: 320
    }

    try {
      const { w, h } = this.calculateDimensions(window.innerWidth)
      this.state.width = w
      this.state.height = h
    } catch { }
  }

  componentDidMount () {
    this.resize = fromEvent(window, 'resize')
      .pipe(
        debounceTime(500),
        pluck('target', 'innerWidth')
      )
      .subscribe((width) => {
        const { w, h } = this.calculateDimensions(window.innerWidth)
        this.setState({ width: w, height: h })
      })
  }

  componentWillUnmount () {
    this.resize.unsubscribe()
  }

  calculateDimensions = (width) => {
    const w = width >= 992
      ? width * 0.7
      : width < 576
        ? width - 20
        : width * 0.9

    return {
      w,
      h: (9 / 16) * w
    }
  }

  toggle = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal
    }))
  }

  formatTime = (date) => {
    const pad = (num) => num < 10 ? `0${num}` : num

    return `${pad(date.getHours())}:${pad(date.getMinutes())}`
  }

  render () {
    const { film } = this.props
    const { width, height } = this.state

    return <>
      <Row>
        <ImgTrailer
          onClick={this.toggle}
          lg={{ size: 4, offset: 0 }}
          md={{ size: 6, offset: 3 }}
          sm={{ size: 8, offset: 2 }}
        >
          <Img src={film.poster} />
          <Icon className='oi oi-play-circle' />
        </ImgTrailer>
        <Col lg={8}>
          <Title>{film.title}</Title>
          <ReleaseDate>Release Date: {new Date(film.dateAdded).toDateString()}</ReleaseDate>
          <Synopsis>{film.synopsis}</Synopsis>
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
                    {this.formatTime(new Date(date.time))}
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
