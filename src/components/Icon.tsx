import React from 'react'
import { IconStyles, IconWrapper } from './styled/Icon'
import Loader from './utils/Loader'

export interface IIconProps {
  type: string,
  icon: string,
  color: string,
  title: string,
  onClick: Function
  loading?: boolean,
  highlight?: boolean,
  multiSelectEnabled?: boolean
}

export default function Icon ({ color, loading, ...props }: IIconProps) {
  return <IconWrapper>
    {loading
      ? <Loader
        color={color}
        size={5.6} 
      />
      // @ts-ignore can't fix, don't know the issue
      : <IconStyles
        color={color}
        {...props}
      />}
  </IconWrapper>
}
