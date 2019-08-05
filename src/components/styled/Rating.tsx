import styled from 'styled-components'
import { IIconProps } from '../../types/react';

export const RatingWrapper = styled.div`
  font-size: 2em;
  margin-top: 0.67em;
`

export const RatingIcon = styled.span.attrs(({ icon }: IIconProps) => ({
  className: `oi oi-${icon}`
})) <IIconProps> `
  font-size: 1em;
  color: ${({ highlighted }) => highlighted ? '#ff8f00' : ''}
`