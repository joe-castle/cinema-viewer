import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap'

import { RowCustom, ColCustom } from './styled/FilmGroup'

function FilmGroup ({ films, title }) {
  return <>
    <h2>{title}</h2>
    <RowCustom>
      {films.map((film) =>
        <ColCustom lg={2} sm={4} xs={6} key={film._id}>
          <Link to={`/films/${film._id}`}>
            <Card>
              <CardImg top src={film.poster} />
              <CardBody>
                <CardTitle>{film.title}</CardTitle>
              </CardBody>
            </Card>
          </Link>
        </ColCustom>
      )}
    </RowCustom>
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
