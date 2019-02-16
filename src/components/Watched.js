import React from 'react'

import { formatTime } from '../common/utils'

function Watched ({ watched }) {
  const { dateTime, rating, notes, format } = watched
  const date = new Date(dateTime)

  return <div>
    <p><strong>Watched: </strong>{date.toDateString()} at {formatTime(date)}</p>
    <p><strong>Rating: </strong>{rating}/100</p>
    <p><strong>Format: </strong>{format}</p>
    <p><strong>Notes: </strong>{notes}</p>
  </div>
}

export default Watched
