import React, { useState } from 'react'
import { CardImg, CardBody, CardTitle, CardSubtitle, Row, Col, Collapse } from 'reactstrap'
import FuzzySearch from 'fuzzy-search'

import { Title, CardCustom, LinkCustom } from './styled/FilmGroup'
import BadgeWrapper from './BadgeWrapper'
import { RouteProps } from 'react-router';
import { IFilm } from '../types/data';
import { useSelector } from 'react-redux';
import { IState } from '../types/redux';
import { checkUserData, notCheckUserData } from '../common/utils';
import { useUser } from '../common/hooks';

export interface IFilmGroupProps extends RouteProps {
  title: string,
  collapse?: boolean
}

export default function FilmGroup ({ title, collapse }: IFilmGroupProps) {
  const [collapseState, setCollapse] = useState(collapse)
  const user = useUser()
  const films = useSelector<IState, IFilm[]>(({ films, search }) => {
    const searchedFilms = new FuzzySearch(films, ['title']).search(search)

    switch (title) {
      case 'Watch List': return searchedFilms.filter((film) => checkUserData(film, 'favourite'))
      case 'Available': return searchedFilms.filter((film) => film.showtimes && notCheckUserData(film, '!favourite', '!hidden', '!watched'))
      case 'Hidden': return searchedFilms.filter((film) => film.showtimes && checkUserData(film, '!favourite', 'hidden', '!watched'))
      case 'Watched': return searchedFilms.filter((film) => checkUserData(film, 'watched'))
      case 'Expired': return searchedFilms.filter((film) => !film.showtimes && checkUserData(film, '!watched'))
      default: return searchedFilms
    }
  })

  return <>
    {title && <Title>
      <h2 onClick={() => { setCollapse(!collapseState) }}>{title}</h2>
      <span className={`oi oi-caret-${collapseState ? 'bottom' : 'top'}`} />
    </Title>}
    <Collapse isOpen={!collapseState}>
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
