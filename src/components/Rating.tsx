import React, { ReactElement } from 'react'
import { IRatingProps } from '../types/react';
import { RatingIcon, RatingWrapper } from './styled/Rating';

function Rating ({ rating, icon }: IRatingProps): ReactElement<IRatingProps> {
  return <RatingWrapper>
    <div className='text-center'>
      <RatingIcon
        icon='star' 
        highlighted={rating} />
      <p>{rating}</p>
    </div>
  </RatingWrapper>
}

export default Rating