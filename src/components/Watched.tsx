import React, { ReactElement } from 'react'

import { formatTime, formatDate } from '../common/utils'
import { IWatched } from '../types/data'
import { IWatchedProps } from '../types/react'

function Watched ({ watched }: IWatchedProps): ReactElement {
  const { dateTime, rating, notes, format }: IWatched = watched
  const date: Date = new Date(dateTime)

  return <div>
    <p><strong>Watched: </strong>{formatDate(date)} at {formatTime(date)}</p>
    <p><strong>Rating: </strong>{rating}/100</p>
    <p><strong>Format: </strong>{format}</p>
    <p><strong>Notes: </strong>{notes}</p>
  </div>
}

export default Watched
