import React from 'react'
import { useState, useEffect } from 'react';
import { APP_NAME, API, IMG_API } from '../config';
import Link from 'next/link';
import Router from 'next/router';
import styles from '../styles/Nav.module.css';
import {signout, isAuth} from '../actions/auth'
import { Dropdown, NavDropdown, Container, Navbar, Nav } from 'react-bootstrap';
import { ImHome3 } from 'react-icons/im';
import { GoThreeBars } from 'react-icons/go';
import Sidebar from './Sidebar';
import Sidebar2 from '../components/admin/Sidebar';


const Header = (props) => {

  const [time, setTime] = useState(true);
  const [date, setDate] = useState(true);

  useEffect(() => {
    setTime(new Date().toLocaleTimeString("en-US"));
    setDate(new Date().toLocaleDateString("en-US"));
  }, []);


 

    const [isOpen, setIsopen] = useState(true);
    const [isOpen2, setIsopen2] = useState(false);

    const ToggleSidebar = () => {
        isOpen === true ? setIsopen(false) : setIsopen(true);
        isOpen2 === false ? setIsopen2(true) : setIsopen2(false);
    }

  return (
    <>
    {/* this is for desktop only more then 1000px*/}
    {/* this style written in Nav.module.css in style folder */}
     <div className={`${styles.hidevar} ${styles.sidebar2} ${isOpen == true ? `${styles.active}` : ''}`}><Sidebar/></div>
     
     {/* This is for mobile menu only less then 1000px */}
     {/* this style written in Nav.module.css in style folder */}
     <div className={`${styles.showmbvar} ${styles.sidebar2} ${isOpen2 == true ? `${styles.active}` : ''}`}><Sidebar2 hideBar={ToggleSidebar}/></div>
    
    
    
    <header className=''>
    <div className='container-fluid bg-dark text-white fixed-top' style={{height: "30px"}}>
      <div className='row'>
        <div className='col-9'>
          <a style={{cursor: "pointer"}} onClick={ToggleSidebar}> <GoThreeBars size="25px"/> </a>
          <Link href="/admin">
          <a style={{cursor: "pointer", color: 'white', fontSize: "15px", marginLeft: "5%"}}> <ImHome3/> Home</a>
          </Link>
          <span style={{marginLeft: "40px"}}>{time}</span>
          <span style={{marginLeft: "40px"}}>{date}</span>
        </div>
       
        <div className='col-3'>
        
   
          <span className='float-end'>
          <Navbar collapseOnSelect variant="dark" style={{marginTop: "-13px", color: "#fff"}}>
            <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title={`${isAuth()?.username}`} id="collasible-nav-dropdown">
                  <NavDropdown.Item>
                    <Link href="/user/update">Profile</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                  {isAuth() && (
                  <a onClick={() => signout(() => Router.push('/signin'))}>
                     Sign Out
                  </a>
                )}
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              
            </Navbar.Collapse>
            </Container>
          </Navbar>
       
        </span>
        <span>
        <img
              src={`${IMG_API}/${isAuth()?.photo}`}
              className="img img-fluid rounded-circle float-end mt-1"
              style={{ maxHeight: '20px', maxWidth: '100%'}}
              alt="profile image"
          />
        </span>
      
        </div>
        <div className='col-2'>
        <span>
       
       </span>
        </div>
      </div>
    </div>




    
    </header>


  
 


</>
  )
}

export default Header