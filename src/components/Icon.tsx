import React, { ReactElement, FC } from 'react'
import { IIconProps } from '../types/react'
import { IconStyles, IconWrapper } from './styled/Icon'
import Loader from './utils/Loader'

function Icon ({ type, icon, color, highlight, loading, ...props }: IIconProps): ReactElement<IIconProps & JSX.IntrinsicElements> {
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

export default Icon