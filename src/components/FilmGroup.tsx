import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CardImg, CardBody, CardTitle, CardSubtitle, Row, Col, Collapse } from 'reactstrap'

import { Title, CardCustom, LinkCustom } from './styled/FilmGroup'
import BadgeWrapper from './BadgeWrapper'
import { IFilmGroupProps, IFilmGroupState } from '../types/react';


class FilmGroup extends Component<IFilmGroupProps, IFilmGroupState> {
  static propTypes = {
    films: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      dateAdded: PropTypes.string,
      edis: PropTypes.arrayOf(PropTypes.string),
      poster: PropTypes.string,
      showtimes: PropTypes.object,
      unlimited: PropTypes.bool,
      url: PropTypes.string,
      user_data: PropTypes.shape({
        _id: PropTypes.string,
        film_id: PropTypes.string,
        user_id: PropTypes.string,
        favourite: PropTypes.bool,
        ignored: PropTypes.bool,
        watched: PropTypes.shape({
          rating: PropTypes.number,
          format: PropTypes.string,
          date_went: PropTypes.string,
          notes: PropTypes.string
        })
      })
    }))
  }

  constructor (props: IFilmGroupProps) {
    super(props)

    this.state = {
      collapse: props.collapse
    }
  }

  render () {
    const { films, title, user }: IFilmGroupProps = this.props

    return <>
      {title && <Title>
        <h2 onClick={() => { this.setState((state) => ({ collapse: !state.collapse })) }}>{title}</h2>
        <span className={`oi oi-caret-${this.state.collapse ? 'bottom' : 'top'}`} />
      </Title>}
      <Collapse isOpen={!this.state.collapse}>
        <Row>
          {films.map((film) =>
            <Col className='mb-4' lg={2} md={3} sm={4} xs={6} key={film._id as string}>
              <LinkCustom to={`/films/${film._id}`}>
                <CardCustom>
                  <CardImg top src={film.poster} />
                  <CardBody className='d-flex flex-column'>
                    <CardTitle className='font-weight-bold' tag='h5'>{film.title}</CardTitle>
                    <CardSubtitle className='mb-2' tag='small'>
                      {new Date(film.releaseDate as string).toDateString()}
                    </CardSubtitle>
                    {user && <BadgeWrapper film={film} />}
                  </CardBody>
                </CardCustom>
              </LinkCustom>
            </Col>
          )}
        </Row>
      </Collapse>
    </>
  }
}

export default FilmGroup
