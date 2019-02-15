import { Col } from 'reactstrap'
import styled from 'styled-components'

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
