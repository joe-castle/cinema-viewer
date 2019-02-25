import { Row, Modal } from 'reactstrap'
import styled from 'styled-components'
import { ITrailerModalProps, IIconProps } from '../../types/react'

export const RowCenter = styled(Row)`
  text-align: center;
`

export const PosterWrapper = styled.div`
  color: rgba(255, 255, 255, 0.6);
  position: relative;
  transition: color ease-in 0.1s;

  &:hover {
    color: white;
    cursor: pointer;
  }
`

export const Poster = styled.img`
  width: 100%;
`

export const PlayIcon = styled.span.attrs({
  className: 'oi oi-play-circle'
})`
  position: absolute;
  left: calc(50% - 0.5em);
  top: calc(50% - 0.5em);
  font-size: 8em;
`

export const TrailerModal = styled(Modal) < ITrailerModalProps > `
  max-width: ${({ width }) => width}px;

  & .modal-content {
    background: none;
    border: none;
  }
`

export const Title = styled.h1`
  margin-bottom: 0;
`

export const ReleaseDate = styled.sub`
  font-weight: bold;
  font-style: italic;
`

export const Icon = styled.span.attrs(({ type, icon }: IIconProps) => ({
  id: `icon-${type}`,
  className: `oi oi-${icon}`
})) < IIconProps > `
  color: ${({ favourite, hiddenIcon }) => favourite ? 'red' : hiddenIcon ? 'green' : ''};
  font-size: 2em;
  transition: color ease-in .1s;
  
  &:not(:first-child) {
    margin-left: .5em;
  }

  &:hover {
    cursor: pointer;
    color: ${({ favourite, hiddenIcon }) => favourite ? 'rgba(255,0,0,.5)' : hiddenIcon ? 'rgba(0,128,0,.5)' : 'rgba(0,0,0,.5)'}
  }
`

export const Synopsis = styled.p`
  margin-top: 1.5em;
`

export const ShowtimesHeader = styled.h2`
  border-bottom: 3px solid rgba(0,0,0,0.5);
  margin-top: 2em;
`
