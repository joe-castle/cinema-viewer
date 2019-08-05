import React from 'react'

import { formatTime } from '../common/utils'
import { IWatched } from '../types/data'

export interface IWatchedProps {
  watched: IWatched
}

export default function Watched ({ watched: { dateTime, rating, notes, format } }: IWatchedProps) {
  const date = new Date(dateTime)

  return <div>
    <p><strong>Watched: </strong>{date.toDateString()} at {formatTime(date)}</p>
    <p><strong>Rating: </strong>{rating}/100</p>
    <p><strong>Format: </strong>{format}</p>
    <p><strong>Notes: </strong>{notes}</p>
  </div>
}
