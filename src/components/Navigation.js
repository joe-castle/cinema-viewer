
import React from 'react'
import {
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button } from 'reactstrap'
import { Link } from 'react-router-dom'

// import GoogleLogin from '../assets/img/btn_google_light_normal_ios.svg'

import { NavBarCustom } from './styled/Navigation'

export default class Navigation extends React.Component {
  constructor (props) {
    super(props)
    this.state = { isOpen: false }
  }

  render () {
    const { user } = this.props
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
            <NavItem active={this.props.url === '/soon'}>
              <Link className='nav-link' to='/soon'>Coming Soon</Link>
            </NavItem>
          </Nav>
          <Nav className='ml-auto' navbar>
            {user && <span className='nav-item navbar-text mr-4'>Hello {user.name.givenName}</span>}
            <NavItem>
              {/* TODO: FIX THE LOGIN BUTTON dangerouslySetInnerHTML={{ __html: GoogleLogin }} */}
              {!user && <a className='btn btn-outline-success' href='/auth/google'>Login with Google</a>}
              {user && <a className='btn btn-outline-light' href='/logout'>Logout</a>}
            </NavItem>
          </Nav>
        </Collapse>
      </NavBarCustom>
    )
  }
}
