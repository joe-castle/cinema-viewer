import React, { Component } from 'react'
import YouTube from 'react-youtube'

import { Trailer } from './styled/TrailerModal'
import { ITrailerModalProps, IDimensions } from '../types/react'
import { calculateDimensions } from '../common/utils'

class TrailerModal extends Component<ITrailerModalProps, IDimensions> {
  constructor(props: ITrailerModalProps) {
    super(props)

    const state = {
      width: '640',
      height: '320'
    }

    try {
      this.state = {
        ...state,
        ...calculateDimensions(window.innerWidth)
      }
    } catch {
      this.state = state
    }
  }
  
  render() {
    const { width, height } = this.state
    const { trailer, toggle, open } = this.props

    return <Trailer width={width} isOpen={open} toggle={toggle} centered>
      <YouTube
        opts={{ width, height }}
        videoId={trailer && trailer.slice(trailer.indexOf('=') + 1, trailer.length)}
      />
    </Trailer>
  }
}

export default TrailerModal