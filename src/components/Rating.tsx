import React from 'react'
import { RatingIcon, RatingWrapper } from './styled/Rating';

export interface IRatingProps {
  rating: number
}

export default function Rating ({ rating }: IRatingProps) {
  return <RatingWrapper>
    <div className='text-center'>
      <RatingIcon
        icon='star' 
        highlighted={rating} />
      <p>{rating}</p>
    </div>
  </RatingWrapper>
}
