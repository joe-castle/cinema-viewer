import React, { Component } from 'react'
import { Row, Col, Modal } from 'reactstrap'
import { fromEvent } from 'rxjs'
import { pluck, debounceTime } from 'rxjs/operators'
import YouTube from 'react-youtube'
import styled from 'styled-components'

const ImgTrailer = styled(Col)`
  color: rgba(255, 255, 255, 0.6);
  transition: color ease-in 0.1s;

  &:hover {
    color: white;
    cursor: pointer;
  }
`

const Img = styled.img`
  width: 100%;
`

const Icon = styled.span`
  position: absolute;
  left: calc(50% - 0.5em);
  top: calc(50% - 0.5em);
  font-size: 8em;
`

const TrailerModal = styled(Modal)`
  max-width: ${({ width }) => width}px;

  & .modal-content {
    background: none;
    border: none;
  }
`

const Title = styled.h1`
  margin-bottom: 0;
`

const SubTitle = styled.sub`
  font-weight: bold;
  font-style: italic;
`

const Synopsis = styled.p`
  margin-top: 1.5em;
`

const ShowTime = styled.a`
  background: ${({ expired }) => `rgba(0,0,0,0.${expired ? 3 : 7})`};
  border-radius: 10px;
  color: ${({ expired }) => `rgba(255,255,255,0.${expired ? 5 : 8})`};;
  margin: 0.2em 0.8em 0.2em 0;
  padding: 0.4em;

  &:hover {
    background: rgba(0,0,0,0.5);
    color: white;
    text-decoration: none;
  }
`

const ShowDate = styled.h5`
  margin-top: 1em;
`

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
    const pad = (num) => num < 10 ? `${num}0` : num

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
          <SubTitle>Release Date: {new Date(film.dateAdded).toDateString()}</SubTitle>
          <Synopsis>{film.synopsis}</Synopsis>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Showtimes:</h2>
        </Col>
      </Row>
      <Row>
        {Object.keys(film.showtimes).map((format) =>
          <Col>
            <h3>{format}</h3>
            {Object.keys(film.showtimes[format]).map((date) =>
              <>
                <ShowDate>{date}</ShowDate>
                {film.showtimes[format][date].map((date) =>
                  <ShowTime href={date.url} target='_blank'>{this.formatTime(new Date(date.time))}</ShowTime>)}
              </>
            )}
          </Col>
        )}
      </Row>
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
