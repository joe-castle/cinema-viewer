import styled from 'styled-components'
import { transparentize } from 'polished'

export interface ILoaderProps {
  color: string,
  size: number
}

const Loader = styled.div`
  border-radius: 50%;
  width: ${({ size }: ILoaderProps) => size}em;
  height: ${({ size }) => size}em;
  /* margin: 60px auto; */
  font-size: ${({ size }) => size}px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid ${({ color }) => transparentize(0.8, color as string)};
  border-right: 1.1em solid ${({ color }) => transparentize(0.8, color as string)};
  border-bottom: 1.1em solid ${({ color }) => transparentize(0.8, color as string)};
  border-left: 1.1em solid ${({ color }) => color};
  transform: translateZ(0);
  animation: loader 1.1s infinite linear;

  &:after {
    border-radius: 50%;
    width: ${({ size }) => size}em;
    height: ${({ size }) => size}em;
  }

  @keyframes loader {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

Loader.defaultProps = {
  color: 'white',
  size: 10
} as ILoaderProps

export default Loader
