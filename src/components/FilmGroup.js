import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Col, Card, CardImg, CardBody, CardTitle } from 'reactstrap'
import chunk from 'lodash.chunk'

import { RowCustom } from './styled/FilmGroup'

function FilmGroup ({ films }) {
  return <>
    {chunk(films, 6).map((chunk, index) =>
      <RowCustom key={index}>
        {chunk.map((film) =>
          <Col lg={{ size: 2, offset: 0 }} sm={{ size: 4, offset: 0 }} xs={{ size: 8, offset: 2 }} key={film._id}>
            <Link to={`/films/${film._id}`}>
              <Card>
                <CardImg top src={film.poster} />
                <CardBody>
                  <CardTitle>{film.title}</CardTitle>
                </CardBody>
              </Card>
            </Link>
          </Col>
        )}
      </RowCustom>
    )}
  </>
}

FilmGroup.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    dateAdded: PropTypes.string,
    edis: PropTypes.arrayOf(PropTypes.string),
    poster: PropTypes.string,
    showtimes: PropTypes.arrayOf(PropTypes.string),
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

export default FilmGroup
