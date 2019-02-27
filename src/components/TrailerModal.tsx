import React from 'react'
import YouTube from 'react-youtube'

import { Trailer } from './styled/TrailerModal'
import { ITrailerModalProps } from '../types/react'

export default function TrailerModal ({ width, height, open, toggle, trailer }: ITrailerModalProps) {
  return <Trailer width={width} isOpen={open} toggle={toggle} centered>
    <YouTube
      opts={{ width, height }}
      videoId={trailer && trailer.slice(trailer.indexOf('=') + 1, trailer.length)}
    />
  </Trailer>
}