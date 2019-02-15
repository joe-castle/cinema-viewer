import { Card } from 'reactstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Title = styled.div`
  transition: color ease-in .1s;
  
  & h2 {
    display: inline-block;
  }

  & span {
    margin-left: .5em;
  }

  &:hover {
    cursor: pointer;
    color: ${({ theme: { primary } }) => `rgb(${primary})`}
  }
`

export const CardCustom = styled(Card)`
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  height: 100%;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);

  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
`

export const LinkCustom = styled(Link)`
  color: rgb(33, 37, 41);

  &:hover {
    color: rgb(33, 37, 41);
    text-decoration: none;
  }
`
