import styled from 'styled-components'
import { Modal } from 'reactstrap'

export interface ITrailerProps {
  width: string,
}

export const Trailer = styled(Modal) <ITrailerProps>`
  max-width: ${({ width }) => width}px;

  & .modal-content {
    background: none;
    border: none;
  }
`