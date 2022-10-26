import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
  
        <NavMenu>
          <NavLink to='/bookings' activeStyle>
            Bookings
          </NavLink>
          <NavLink to='/calendar' activeStyle>
            Calendar
          </NavLink>
          <NavLink to='/seating' activeStyle>
            Seating
          </NavLink>
          <NavLink to='/reporting' activeStyle>
            Reporting
          </NavLink>
        
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};
  
export default Navbar;