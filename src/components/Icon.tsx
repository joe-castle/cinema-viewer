import React, { ReactElement } from 'react'
import { IIconProps } from '../types/react'
import { IconStyles, IconWrapper } from './styled/Icon'
import Loader from './utils/Loader'

function Icon ({ type, icon, color, highlight, loading, ...props }: IIconProps): ReactElement<IIconProps> {
  return <IconWrapper>
    {loading
      ? <Loader
        color='red'
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