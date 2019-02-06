import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle } from 'reactstrap'
import chunk from 'lodash.chunk'
import styled from 'styled-components'

const RowCustom = styled(Row)`
  margin-bottom: 1em;
`

function FilmGroup ({ films }) {
  return <Container>
    {chunk(films, 6).map((chunk) =>
      <RowCustom>
        {chunk.map((film) =>
          <Col lg={2} sm={4} xs={12}>
            <Card>
              <CardImg top src={film.poster} />
              <CardBody>
                <CardTitle>{film.title}</CardTitle>
              </CardBody>
            </Card>
          </Col>
        )}
      </RowCustom>
    )}
  </Container>
}

FilmGroup.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    date_added: PropTypes.string,
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
