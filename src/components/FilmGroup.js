import React from 'react'
import PropTypes from 'prop-types'
import { CardImg, CardBody, CardTitle, CardSubtitle, Row, Col, Badge } from 'reactstrap'

import { CardCustom, LinkCustom, BadgeWrapper } from './styled/FilmGroup'

function renderNewBadge (film) {
  if (!film.userData || (film.userData && film.userData.new !== false)) {
    return <Badge color='success'>new</Badge>
  }

  return null
}

function FilmGroup ({ films, title, user }) {
  return <>
    <h2>{title}</h2>
    <Row>
      {films.map((film) =>
        <Col className='mb-4' lg={2} md={3} sm={4} xs={6} key={film._id}>
          <LinkCustom to={`/films/${film._id}`}>
            <CardCustom>
              <CardImg top src={film.poster} />
              <CardBody className='d-flex flex-column'>
                <CardTitle className='font-weight-bold' tag='h5'>{film.title}</CardTitle>
                <CardSubtitle className='mb-2' tag='small'>
                  {new Date(film.releaseDate).toDateString()}
                </CardSubtitle>
                {user && <BadgeWrapper>
                  {renderNewBadge(film)}
                  {film.userData && film.userData.watched && <Badge color='warning'>watched</Badge>}
                  {film.userData && film.userData.unlimited && <Badge color='danger'>unlimited</Badge>}
                </BadgeWrapper>}
              </CardBody>
            </CardCustom>
          </LinkCustom>
        </Col>
      )}
    </Row>
  </>
}

FilmGroup.propTypes = {
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

export default FilmGroup
