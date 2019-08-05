import React from 'react'

import {
  ShowCol,
  ShowTime,
  ShowDate
} from './styled/Showtimes'
import { RowCenter } from './styled/Film'

import { formatTime, formatDate } from '../common/utils'
import { IShowtimes } from '../types/data';

export interface IShowTimesProps {
  showtimes: IShowtimes
}

export default function Showtimes ({ showtimes }: IShowTimesProps) {
  return <RowCenter>
    {Object.keys(showtimes).map((format) =>
      <ShowCol lg={4} md={12}>
        <h3>{format}</h3>
        {Object.keys(showtimes[format]).map((date) => {
          const today = formatDate(new Date()) === date

          return <>
            <ShowDate today={today}>{date}</ShowDate>
            {showtimes[format][date].map((date) => {
              // Mark as expired if show has been running for an hour
              const expired = (Date.parse(date.time as string) + (60 * 60 * 1000)) < Date.now()

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
