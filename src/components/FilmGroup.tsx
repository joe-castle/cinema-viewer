import React, { useState, useMemo } from 'react'
import { CardImg, CardBody, CardTitle, CardSubtitle, Row, Col, Collapse, Table } from 'reactstrap'
import FuzzySearch from 'fuzzy-search'
import { useTable, useSortBy } from 'react-table'

import { Title, CardCustom, LinkCustom } from './styled/FilmGroup'
import BadgeWrapper from './BadgeWrapper'
import { RouteProps } from 'react-router';
import { IFilm, IUser } from '../types/data';
import { useSelector } from 'react-redux';
import { IState } from '../types/redux';
import { checkUserData, notCheckUserData } from '../common/utils';
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

const ArrowSpan = styled.span`
  margin-left: 5px;
`

function Tabular ({ films }: LayoutProps) {
  const columns = useMemo(() => [
    {
      Header: 'Title',
      accessor: 'title',
      sortType: 'basic'
    },
    {
      Header: 'Rating',
      accessor: 'rating',
      sortType: 'basic'
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
          title: film.title,
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
        (row, i) => {
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
