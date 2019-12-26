import React, { useState } from 'react'
import { CardImg, CardBody, CardTitle, CardSubtitle, Row, Col, Collapse, Table } from 'reactstrap'
import FuzzySearch from 'fuzzy-search'

import { Title, CardCustom, LinkCustom } from './styled/FilmGroup'
import BadgeWrapper from './BadgeWrapper'
import { RouteProps } from 'react-router';
import { IFilm, IUser } from '../types/data';
import { useSelector } from 'react-redux';
import { IState } from '../types/redux';
import { checkUserData, notCheckUserData, formatDate } from '../common/utils';
import { useUser } from '../common/hooks';
import styled from 'styled-components'

export interface IFilmGroupProps extends RouteProps {
  title: string,
  collapse?: boolean
}

interface LayoutProps {
  films: IFilm[],
  user?: IUser|null
}

const Th = styled.th`
  width: 10%;
`

function Tabular ({ films }: LayoutProps) {
  return <Table dark>
    <thead>
      <tr>
        <th>Title</th>
        <th>Rating</th>
        <th>Review</th>
        <Th>Watched</Th>
      </tr>
    </thead>
    <tbody>
      {films.map((film) => <tr key={film.title}>
        <th scope='row'>{film.title}</th>
        <td>{film.userData.watched.rating}</td>
        <td>{film.userData.watched.notes}</td>
        <td>{formatDate(new Date(film.userData.watched.dateTime))}</td>
      </tr>)}
    </tbody>
  </Table>
}

function Grid ({ films, user }: LayoutProps) {
  return <> {films.map((film) =>
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
    </Col>)}
  </>
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
        {title === 'Watched' 
          ? <Tabular films={films} />
          : <Grid user={user} films={films} />}
      </Row>
    </Collapse>
  </>
}
