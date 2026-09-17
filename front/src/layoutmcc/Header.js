/* eslint-disable no-nested-ternary */
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import Sidebar from 'react-bootstrap-sidebar';
// import Sidebar from 'react-bootstrap-sidebar';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const Header = () => {
  const [menuOpen, setmenuOpen] = useState(false);
  const [active1, setactive1] = useState(false);
  const [active2, setactive2] = useState(false);
  const [active3, setactive3] = useState(false);
  const [active4, setactive4] = useState(false);
  const [active5, setactive5] = useState(false);
  const { isLogin, currentUser } = useSelector((state) => state.auth);
  const handleStateChange = (state) => () => setmenuOpen(state.isOpen);
  const closeMenu = () => setmenuOpen(false);
  const toggleMenu = () => setmenuOpen(!menuOpen);
  const addActiveClass1 = () => setactive1(!active1);
  const addActiveClass2 = () => setmenuOpen(!active2);
  return (
    <div>
      {/* Required meta tags */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      {/* Bootstrap CSS */}
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossOrigin="anonymous"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@500;700&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="assets/css/style.css" />
      <link rel="stylesheet" href="assets/css/responsive.css" />
      <link rel="stylesheet" href="assets/css/lightslider.css" />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
        integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" type="text/css" href="assets/css/slick.css" />
      <link rel="stylesheet" type="text/css" href="assets/css/slick-theme.css" />
      <title>Madras Cricket Club</title>
      <header>
        <div className="container d-flex justify-content-between">
          <a href="/home" className="d-flex align-items-center">
            <img src="/assets/images/logo.png" alt="Madras Cricket Club" />
          </a>
          <a href="#" onClick={toggleMenu} className="d-flex align-items-center toggle-slide-right">
            <i className="fas fa-bars" />
          </a>
        </div>
      </header>
      {/* onOpen={ handleOnOpen } onClose={ handleOnClose } onStateChange={ isMenuOpen } */}

      <div id="sidebarb">
        <Menu
          customBurgerIcon={false}
          isOpen={menuOpen}
          className="menu hamb-menu slide-menu-right"
          pageWrapId="page-wrap"
          outerContainerId="sidebarb"
          width="580px"
          right
        >
          <div id="page-wrap">
            <a href="#" className="close-menu" onClick={closeMenu}>
              <i className="fas fa-times" />
            </a>

            <div className="menulist">
              <ul>
                <li>
                  <NavLink to="/aboutus" onClick={closeMenu}>
                    MCC Story
                  </NavLink>
                </li>
                <li className={active1 ? 'li-menu intro' : 'li-menu'}>
                  <a href="#" onClick={() => setactive1(!active1)}>
                    <i className="fas fa-sort-down" />
                    Sports
                  </a>

                  <ul className="submenu">
                    <li>
                      <NavLink to="/billiards" onClick={closeMenu}>
                        Billiards
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/badminton" onClick={closeMenu}>
                        Badminton
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/cricket" onClick={closeMenu}>
                        Cricket
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/hockey" onClick={closeMenu}>
                        Hockey
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/squash" onClick={closeMenu}>
                        Squash
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/tennis" onClick={closeMenu}>
                        Tennis
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/swimming" onClick={closeMenu}>
                        Swimming
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className={active2 ? 'li-menu intro' : 'li-menu'}>
                  <a href="#" onClick={() => setactive2(!active2)}>
                    <i className="fas fa-sort-down" />
                    Wellness
                  </a>
                  <ul className="submenu">
                    <li>
                      <NavLink to="/gym" onClick={closeMenu}>
                        Gymnasium
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/yoga" onClick={closeMenu}>
                        Yoga
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/otherwellness" onClick={closeMenu}>
                        Other facilities
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className={active3 ? 'li-menu intro' : 'li-menu'}>
                  <a href="#" onClick={() => setactive3(!active3)}>
                    <i className="fas fa-sort-down" />
                    Pursuit
                  </a>
                  <ul className="submenu">
                    <li>
                      <NavLink to="/library" onClick={closeMenu}>
                        Library
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/cards" onClick={closeMenu}>
                        Cards
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className={active4 ? 'li-menu intro' : 'li-menu'}>
                  <a href="#" onClick={() => setactive4(!active4)}>
                    <i className="fas fa-sort-down" />
                    Social
                  </a>
                  <ul className="submenu">
                    <li>
                      <NavLink to="/Yorkerbar" onClick={closeMenu}>
                        Bar
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/restaurants" onClick={closeMenu}>
                        Dining Facilities
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/banquets" onClick={closeMenu}>
                        Banquets
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className={active5 ? 'li-menu intro' : 'li-menu'}>
                  <a href="#" onClick={() => setactive5(!active5)}>
                    <i className="fas fa-sort-down" />
                    Stay
                  </a>
                  <ul className="submenu">
                    <li>
                      <NavLink to="/thechambers" onClick={closeMenu}>
                        Chambers
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li>
                  <NavLink to="/events" onClick={closeMenu}>
                    Events
                  </NavLink>
                </li>
                <li className="btm-line" />
                <li>
                  <NavLink to="/affiliated" onClick={closeMenu}>
                    Affiliate Clubs
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/chamberbooking" onClick={closeMenu}>
                  The Chambers Booking
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contactus" onClick={closeMenu}>
                    Contact Us
                  </NavLink>
                </li>
                <li>
                  {isLogin && currentUser.type === 'U' ? (
                    <NavLink to="/member/viewStatement" onClick={closeMenu}>
                      My Account
                    </NavLink>
                  ) : isLogin && currentUser.type === 'A' ? (
                    <NavLink to="/admin/dashboard" onClick={closeMenu}>
                    My Account
                    </NavLink>
                  ) : (
                    <NavLink to="/login" onClick={closeMenu}>
                      Login
                    </NavLink>
                  )}
                </li>
              </ul>
              {/* <div class="social-connect">
          <a href=""><i class="fab fa-facebook-f"></i></a>
          <a href=""><i class="fab fa-twitter"></i></a>
          <a href=""><i class="fab fa-youtube"></i></a>
          <a href=""><i class="fab fa-instagram"></i></a>
      </div> */}
              <div className="copy-rights">Copyright © 2021 Madras Cricket Club. All Rights Reserved.</div>
            </div>
          </div>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
