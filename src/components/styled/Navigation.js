import { Navbar } from 'reactstrap'
import styled from 'styled-components'

export const NavBarCustom = styled(Navbar)`
  background-color: rgb(${({ theme: { primary } }) => primary});
  margin-bottom: 1em;
`
