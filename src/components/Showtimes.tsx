import React, { ReactElement } from 'react'

import { RowCenter } from './styled/Film'

import {
  ShowCol,
  ShowTime,
  ShowDate
} from './styled/Showtimes'

import { formatTime, formatDate } from '../common/utils'
import { IShowTimesProps } from '../types/react'

function Showtimes ({ showtimes }: IShowTimesProps): ReactElement {
  return <RowCenter>
    {Object.keys(showtimes).map((format) =>
      <ShowCol lg={4} md={12} key={format}>
        <h3>{format}</h3>
        {Object.keys(showtimes[format]).map((date) => {
          const today: boolean = formatDate(new Date()) === date
          return <>
            <ShowDate today={today}>{date}</ShowDate>
            {showtimes[format][date].map((date) => {
              // Mark as expired if show has been running for an hour
              const expired: boolean = (Date.parse(date.time as string) + (60 * 60 * 1000)) < Date.now()
              return <ShowTime
                today={today}
                expired={expired}
                {...(expired ? {} : { href: date.url, target: '_blank' })}
              >
                {formatTime(new Date(date.time))}
              </ShowTime>
            })}
          </>
        })}
      </ShowCol>
    )}
  </RowCenter>
}

export default Showtimes
