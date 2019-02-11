
import React from 'react'
import {
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem } from 'reactstrap'
import { Link } from 'react-router-dom'

// import GoogleLogin from '../assets/img/btn_google_light_normal_ios.svg'

import { NavBarCustom } from './styled/Navigation'

export default class Navigation extends React.Component {
  constructor (props) {
    super(props)
    this.state = { isOpen: false }
  }

  render () {
    return (
      <NavBarCustom dark expand='md'>
        <NavbarBrand href='/'>Cinema Viewer</NavbarBrand>
        <NavbarToggler onClick={(() => this.setState({ isOpen: !this.state.isOpen }))} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar>
            <NavItem active={this.props.url === '/'}>
              <Link className='nav-link' to='/'>Home</Link>
            </NavItem>
            <NavItem active={this.props.url.startsWith('/films')}>
              <Link className='nav-link' to='/films'>Films</Link>
            </NavItem>
          </Nav>
          <Nav className='ml-auto' navbar>
            <NavItem>
              {/* TODO: FIX THE LOGIN BUTTON */}
              {/* <NavLink href='/auth/google' dangerouslySetInnerHTML={{ __html: GoogleLogin }} /> */}
            </NavItem>
          </Nav>
        </Collapse>
      </NavBarCustom>
    )
  }
}
