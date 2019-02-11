import styled from 'styled-components'

export const CopyrightText = styled.p`
  font-weight: 500;
  margin: 0 3em;
`
// FIX: Footer doesn't go to the bottom of the page, see A Dog's Way Home For an example
export default styled.footer`
  background: rgb(${({ theme: { dark } }) => dark});
  bottom: -8em;
  color: rgb(${({ theme: { secondary } }) => secondary});
  display: flex;
  align-items: center;
  height: 6em;
  position: absolute;
  width: 100%
`
