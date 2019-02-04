import styled from 'styled-components'
import React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap'

const NavBarCustomer = styled(Navbar)`
  background-color: #e3f2fd;
`

export default class Navigation extends React.Component {
  constructor (props) {
    super(props)
    this.state = { isOpen: false }
  }

  render () {
    return (
      <NavBarCustomer light expand='md'>
        <NavbarBrand href='/'>Cinema Viewer</NavbarBrand>
        <NavbarToggler onClick={(() => {
          this.setState({ isOpen: !this.state.isOpen })
        })} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink href='/components/'>Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='https://github.com/reactstrap/reactstrap'>GitHub</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </NavBarCustomer>
    )
  }
}
