import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { IState, IMultiSelect } from '../types/redux'
import { multiSelectActions } from '../store/actions/multiSelect'
import { IFilm } from '../types/data'
import { filmActions } from '../store/actions/films'
import { checkUserData } from '../common/utils'
import Icon from './Icon'

export default function BulkSelector() {
  // const multiSelect = useSelector<IState, boolean>(({ multiSelect }) => multiSelect)
  const dispatch = useDispatch()
  const films = useSelector<IState, IFilm[]>(({ films }) => films.filter((film) => film.selected))
  // @ts-ignore
  const { enabled, favouriteLoading, hiddenLoading } = useSelector<IState, IMultiSelect>(({ multiSelect }) => multiSelect)

  function updateFilmUserData(type: string) {
    if (enabled) {
      const toggleType = 
        films.filter((film) => checkUserData(film, type)).length
        >
        (films.length / 2) 
  
      dispatch(multiSelectActions[`set${type.replace(/\w/, m => m.toUpperCase())}Loading`](true))

      dispatch(filmActions.postUpdateMultipleFilms(
        films.map((film) => ({ ...{ _id: film._id }, [type]: !toggleType, new: false })))
      )
  
      films.forEach((film) => dispatch(filmActions.toggleSelected({ _id: film._id })))
  
      dispatch(multiSelectActions.toggleMultiSelect(true))
    }
  }

  return <>
    {/* toggleMultiSelect uses internal state check to toggle, the empty object is irrelevant */}
    <Icon
      onClick={() => dispatch(multiSelectActions.toggleMultiSelect(true))}
      type='check'
      icon='check'
      title='Enable multi select'
      color='#016adb'
      highlight={enabled}
      loading={false} />
    <Icon
      onClick={() => updateFilmUserData('favourite')}
      type='favourite'
      icon='heart'
      title='Add to watch list'
      color='red'
      highlight={enabled}
      loading={favouriteLoading} 
      multiSelectEnabled={enabled} />
    <Icon
      onClick={() => updateFilmUserData('hidden')}
      type='hidden'
      icon='eye'
      title='Hide from '
      color='green'
      highlight={enabled}
      loading={hiddenLoading}
      multiSelectEnabled={enabled} />
  </>
}