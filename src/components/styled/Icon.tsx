import styled from 'styled-components';
import { IIconProps } from '../../types/react';
import { transparentize } from 'polished';

export const IconStyles = styled.span.attrs(({ type, icon }: IIconProps) => ({
  id: `icon-${type}`,
  className: `oi oi-${icon}`
})) <IIconProps> `
  color: ${({ color, highlight }) => highlight ? color : ''};
  font-size: 1.95em;
  transition: color ease-in .1s;

  &:hover {
    cursor: pointer;
    color: ${({ color, highlight }) => highlight ? transparentize(0.5, color) : 'rgba(0,0,0,.5)'}
  }
`

export const IconWrapper = styled.div`
  display: inline-block;
  
  &:not(:first-child) {
    margin-left: .5em;
  }
`