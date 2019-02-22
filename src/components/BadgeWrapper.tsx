import React, { ReactElement } from 'react'
import { Badge } from 'reactstrap'
import styled from 'styled-components'

import { notCheckUserData, checkUserData, formatDate, formatTime } from '../common/utils'
import { IBadgeWrapperProps } from '../types/react'
function BadgeWrapperComp ({ film, ...props }: IBadgeWrapperProps): ReactElement {
  // @ts-ignore undefined check performed by checkUserData
  const watchedDate = new Date(checkUserData(film, 'watched') && film.userData.watched.dateTime)

  return <div {...props}>
    {notCheckUserData(film, (ud) => ud.new !== false) && <Badge color='success'>new</Badge>}
    {checkUserData(film, 'watched') && <Badge color='warning'>
      {`${formatDate(watchedDate)} ${formatTime(watchedDate)}`}
    </Badge>}
    {film.unlimited && <Badge check='unlimited' color='danger'>unlimited</Badge>}
  </div>
}

const BadgeWrapper = styled(BadgeWrapperComp)`
  margin-top: auto;

  & .badge:not(:first-child) {
    margin-left: .25em;
  }
`

export default BadgeWrapper
