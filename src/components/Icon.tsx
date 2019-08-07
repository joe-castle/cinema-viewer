import React from 'react'
import { IconStyles, IconWrapper } from './styled/Icon'
import Loader from './utils/Loader'

export interface IIconProps {
  type: string,
  icon: string,
  color: string,
  loading?: boolean,
  highlight?: boolean,
  title: string,
  // favourite?: boolean,
  // hiddenIcon?: boolean
  onClick: Function
}

export default function Icon ({ type, icon, color, highlight, loading, ...props }: IIconProps) {
  return <IconWrapper>
    {loading
      ? <Loader
        color={color}
        size={5.6} 
      />
      : <IconStyles
        type={type}
        icon={icon}
        color={color}
        highlight={highlight}
        {...props}
      />}
  </IconWrapper>
}
