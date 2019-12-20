import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Collapse, Input, Nav, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';
import { useUser } from '../common/hooks';
import { searchActions } from '../store/actions/search';
// import GoogleLogin from '../assets/img/btn_google_light_normal_ios.svg'
import { NavBarCustom } from './styled/Navigation';


export interface INavigationProps {
  url: string
}

export default function Navigation ({ url }: INavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const user = useUser()

  const dispatch = useDispatch()

  return (
    <NavBarCustom dark expand='md'>
      <NavbarBrand href='/'>Cinema Viewer</NavbarBrand>
      <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
      <Collapse isOpen={isOpen} navbar>
        <Nav navbar>
          <NavItem active={url === '/'}>
            <Link className='nav-link' to='/'>Home</Link>
          </NavItem>
          <NavItem active={url.startsWith('/films')}>
            <Link className='nav-link' to='/films'>Films</Link>
          </NavItem>
          <NavItem active={url === '/soon'}>
            <Link className='nav-link' to='/soon'>Coming Soon</Link>
          </NavItem>
          <NavItem>
            <Input placeholder='Search...'
             onChange={ev => { dispatch(searchActions.updateSearchValue(ev.target.value)) }} />
          </NavItem>
        </Nav>
        <Nav className='ml-auto' navbar>
          {user && user.name && <span className='nav-item navbar-text mr-4'>Hello {user.name.givenName}</span>}
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
