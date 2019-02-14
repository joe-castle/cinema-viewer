import { Col, Row, Modal } from 'reactstrap'
import styled from 'styled-components'

export const RowCenter = styled(Row)`
  text-align: center;
`

export const ImgTrailer = styled(Col)`
  color: rgba(255, 255, 255, 0.6);
  transition: color ease-in 0.1s;

  &:hover {
    color: white;
    cursor: pointer;
  }
`

export const Img = styled.img`
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

export const TrailerModal = styled(Modal)`
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

export const Icon = styled.span.attrs(({ type, icon }) => ({
  id: `icon-${type}`,
  className: `oi oi-${icon}`
}))`
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

export const Showtimes = styled.h2`
  border-bottom: 3px solid rgba(0,0,0,0.5);
  margin-top: 2em;
`

export const ShowCol = styled(Col)`
  margin-top: 2em;
`

export const ShowTime = styled.a`
  background: ${({ expired, today, theme: { dark, secondary } }) =>
    expired ? `rgba(${secondary})` : `rgba(${today ? dark : '0,0,0,0.8'})`};
  border-radius: 10px;
  color: ${({ expired, today, theme: { dark, secondary } }) =>
    expired ? `rgba(${dark})` : `rgba(${today ? secondary : '255,255,255,0.7'})`};
  display: inline-block;
  margin: 0.2em 0.8em 0.2em 0;
  padding: 0.4em;
  transition: all ease-in 0.1s;

  &:hover {
    text-decoration: none;
    
    ${({ expired, today, theme: { dark, secondary } }) => expired ? `
      cursor: no-drop;
    ` : `
      background: rgba(${today ? secondary : '0,0,0,0.3'});
      color: rgba(${today ? dark : '0,0,0,0.8'});
    `}
  }
`

export const ShowDate = styled.h5`
  ${({ today, theme: { primary } }) => today && `
    color: rgb(${primary});
    font-weight: bold;
  `}
  margin-top: 1em;
`