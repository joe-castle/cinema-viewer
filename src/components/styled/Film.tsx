import { Row } from 'reactstrap'
import styled from 'styled-components'

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

export const LargeIcon = styled.span.attrs(({ type, color }: { type: string, color?: string }) => ({
  className: `oi oi-${type}`
}))`
  color: ${({ color }) => color};
  position: absolute;
  left: calc(50% - 0.5em);
  top: calc(50% - 0.5em);
  font-size: 8em;
`

export const Title = styled.h1`
  margin-bottom: 0;
`

export const SubInfo = styled.sub`
  font-weight: bold;
`

export const Synopsis = styled.p`
  margin-top: 1.5em;
`

export const ShowtimesHeader = styled.h2`
  border-bottom: 3px solid rgba(0,0,0,0.5);
  margin-top: 2em;
`
