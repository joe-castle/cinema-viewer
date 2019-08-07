import React, { useState } from 'react'
import YouTube from 'react-youtube'

import { Trailer } from './styled/TrailerModal'
import { calculateDimensions } from '../common/utils'
import Loader from './utils/Loader';
import styled from 'styled-components';

export interface ITrailerModalProps {
  trailer?: string,
  toggle: () => void,
  open: boolean
}

const LoaderWrapper = styled.div`
  position: absolute;
  top: calc(50% - 3em);
  left: calc(50% - 3em);
`

export default function TrailerModal ({ trailer, toggle, open }: ITrailerModalProps) {
  const [loaded, setLoaded] = useState(false)
  const [size] = useState(() => {
    try {
      return calculateDimensions(window.innerWidth)
    } catch {
      return {
        width: '640',
        height: '320'
      }
    }
  })

  return <Trailer 
    onClosed={() => { setLoaded(false) }}
    width={size.width} isOpen={open} toggle={toggle} centered
  >
    {/**
    // @ts-ignore don't know how to fix this error */}
    {!loaded && <LoaderWrapper><Loader /></LoaderWrapper>}
    <YouTube
      opts={size}
      videoId={trailer && trailer.slice(trailer.indexOf('=') + 1, trailer.length)}
      onReady={() => { setLoaded(true) }}
    />
  </Trailer>
}