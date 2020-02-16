import React, { useState, useMemo } from 'react'
import { CardImg, CardBody, CardTitle, CardSubtitle, Row, Col, Collapse, Table } from 'reactstrap'
import FuzzySearch from 'fuzzy-search'
import { useTable, useSortBy } from 'react-table'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Title, CardCustom, LinkCustom } from './styled/FilmGroup'
import BadgeWrapper from './BadgeWrapper'
import { RouteProps } from 'react-router';
import { IFilm, IUser } from '../types/data';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../types/redux';
import { checkUserData, notCheckUserData } from '../common/utils';
import { useUser } from '../common/hooks';
import { filmActions } from '../store/actions/films'
import { LargeIcon } from './styled/Film'

export interface IFilmGroupProps extends RouteProps {
  title: string,
  collapse?: boolean,
}

interface LayoutProps {
  films: IFilm[],
  multiSelectEnabled: boolean,
  user?: IUser|null
}

const ArrowSpan = styled.span`
  margin-left: 5px;
`

const Cursor = styled.span`
  cursor: pointer;
`

const Background = styled.span`
  background: rgba(50, 144, 246, 0.5);
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
`

function Tabular ({ films }: LayoutProps) {
  const columns = useMemo(() => [
    {
      Header: 'Title',
      accessor: 'title',
      // @ts-ignore
      Cell: ({ rows, cell }) =>
        // @ts-ignore
        <Link to={`/films/${rows.find(row => row.original.title === cell.value).original.filmId}`}>
          {cell.value}
        </Link>
    },
    {
      Header: 'Rating',
      accessor: 'rating'
    },
    {
      Header: 'Review',
      accessor: 'notes',
      disableSortBy: true
    },
    {
      Header: 'Watched',
      accessor: 'dateTime',
      sortType: 'datetime',
      // @ts-ignore
      Cell: ({ cell: { value }}) => value.toLocaleString().replace(/,(.+):\d\d/, '$1')
    }
  ], [])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      data: useMemo(() => films.map(film => ({
          // @ts-ignore cannot be undefined at this point
          ...film.userData.watched,
          // @ts-ignore cannot be undefined at this point
          dateTime: new Date(film.userData.watched.dateTime),
          // @ts-ignore cannot be undefined at this point
          title: film.title,
          filmId: film._id
        })), films),
      columns,
    },
    useSortBy
  )

  return <Table bordered striped {...getTableProps()}>
    <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
              //@ts-ignore
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                {/*
                //@ts-ignore */}
                {column.isSorted && <ArrowSpan className={`oi oi-caret-${column.isSortedDesc ?'bottom' : 'top'}`} />}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody {...getTableBodyProps()}>
      {rows.map(
        (row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )}
      )}
    </tbody>
  </Table>
}

function Grid ({ films, user, multiSelectEnabled }: LayoutProps) {
  const dispatch = useDispatch()
  const card = (film: IFilm, selected?: boolean) => <CardCustom>
    <CardImg top src={film.poster} />
    <CardBody className='d-flex flex-column'>
      <CardTitle className='font-weight-bold' tag='h5'>{film.title}</CardTitle>
      <CardSubtitle className='mb-2' tag='small'>
        {new Date(film.releaseDate as string).toDateString()}
      </CardSubtitle>
      {user && <BadgeWrapper film={film} />}
    </CardBody>
    {selected && <Background />}
  </CardCustom>

  return <> {films.map((film) =>
    <Col className='mb-4' lg={2} md={3} sm={4} xs={6} key={film._id as string}>
      {multiSelectEnabled
        ? <Cursor onClick={() => dispatch(filmActions.toggleSelected({ _id: film._id }))}>
            {card(film, film.selected)}
            {/* 
            // @ts-ignore */}
            {film.selected && <LargeIcon type='circle-check' color='#016adb' />}
          </Cursor>
        : <LinkCustom to={`/films/${film._id}`}>{card(film)}</LinkCustom>
      }
    </Col>)}
  </>
}

export default function FilmGroup ({ title, collapse }: IFilmGroupProps) {
  const [collapseState, setCollapse] = useState(collapse)
  const user = useUser()
  // @ts-ignore
  const multiSelectEnabled = useSelector<IState, boolean>(({ multiSelect }) => multiSelect.enabled)
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
          ? <Tabular films={films} multiSelectEnabled={multiSelectEnabled} />
          : <Grid user={user} films={films} multiSelectEnabled={multiSelectEnabled} />}
      </Row>
    </Collapse>
  </>
}
