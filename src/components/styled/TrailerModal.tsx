import styled from 'styled-components'
import { Modal } from 'reactstrap'

import { ITrailerProps } from '../../types/react'

export const Trailer = styled(Modal) <ITrailerProps>`
  max-width: ${({ width }) => width}px;

  & .modal-content {
    background: none;
    border: none;
  }
`