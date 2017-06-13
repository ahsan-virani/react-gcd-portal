import React from 'react';

import Img from './Img';
import Logo from './logo.png';
import NavBar from './NavBar';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import './styles.css'



class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function

 craeteNavbarButton(link,linkTitle,eventKeyNumber){
   return(
     <LinkContainer to={{ pathname: link }}>
       <NavItem eventKey={eventKeyNumber}>
       {linkTitle}
     </NavItem>
     </LinkContainer>
   );
 }

 craeteNavbarDisabledButton(link,linkTitle,eventKeyNumber){
   return(
     <LinkContainer to={{ pathname: link }} disabled>
       <NavItem eventKey={eventKeyNumber}>
       {linkTitle}
     </NavItem>
     </LinkContainer>
   );
 }
 render() {
   return (
     <Navbar className="custom-navbar" collapseOnSelect style={{backgroundColor: 'rgba(46,50,53,0.9)'}}>
   <Navbar.Header>
     <div className="logo">
       <Link to="/login">
         <Img src={Logo} alt="GlobalCoinDex"/>
       </Link>
     </div>
     <Navbar.Toggle />
   </Navbar.Header>
   <Navbar.Collapse>

     <Nav className="nav-bar-items">
     {this.craeteNavbarButton('/wallet','Home',1)}
     {this.craeteNavbarButton('/login','Login',2)}
     {this.craeteNavbarDisabledButton('/about','About',3)}
     {this.craeteNavbarDisabledButton('/features','Features',4)}
     {this.craeteNavbarDisabledButton('/security','Security',5)}
     {this.craeteNavbarDisabledButton('/marketstats','Market Statistics',6)}
     {this.craeteNavbarDisabledButton('/changelog','Change Log',7)}
     {this.craeteNavbarDisabledButton('/contact','Contact',8)}
     </Nav>

   </Navbar.Collapse>
 </Navbar>

   );
 }
}

export default Header;
