import 'react-toastify/dist/ReactToastify.css';
import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
// import Sidebar from 'react-bootstrap-sidebar';
// import Sidebar from 'react-bootstrap-sidebar';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      menuOpen: false,
      active1: false,
      active2: false,
      active3: false,
      active4: false,
      active5: false,
    };
  }
  // This keeps your state in sync with the opening/closing of the menu
  // via the default means, e.g. clicking the X, pressing the ESC key etc.

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu() {
    this.setState({ menuOpen: false });
  }

  // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  toggleMenu() {
    this.setState((state) => ({ menuOpen: !state.menuOpen }));
  }

  // componentWillMount() {
  //   // window.homeslider();
  // }
  addActiveClass1() {
    const currentState = this.state.active1;
    this.setState({
      active1: !currentState,
    });
  }

  addActiveClass2() {
    const currentState = this.state.active2;
    this.setState({
      active2: !currentState,
    });
  }

  render() {
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
        <link rel="stylesheet" href="css/style.css" />
        <link rel="stylesheet" href="css/responsive.css" />
        <link rel="stylesheet" href="css/lightslider.css" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
          integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" type="text/css" href="css/slick.css" />
        <link rel="stylesheet" type="text/css" href="css/slick-theme.css" />
        <title>Madras Cricket Club</title>
        <header>
          <div className="container d-flex justify-content-between">
            <a href="home.html" className="d-flex align-items-center">
              <img src="images/logo.png" alt="Madras Cricket Club" />
            </a>
            <a href="javascript:void(0)" onClick={() => this.toggleMenu()} className="d-flex align-items-center toggle-slide-right">
              <i className="fas fa-bars" />
            </a>
          </div>
        </header>
        {/* onOpen={ handleOnOpen } onClose={ handleOnClose } onStateChange={ isMenuOpen } */}

        <div id="sidebarb">
          <Menu
            customBurgerIcon={false}
            isOpen={this.state.menuOpen}
            onStateChange={(state) => this.handleStateChange(state)}
            className="menu hamb-menu slide-menu-right"
            pageWrapId="page-wrap"
            outerContainerId="sidebarb"
            width="580px"
            right
          >
            <div id="page-wrap">
              <a href="javascript:void(0)" className="close-menu" onClick={() => this.closeMenu()}>
                <i className="fas fa-times" />
              </a>

              <div className="menulist">
                <ul>
                  <li>
                    <a href="about-us.html">MCC Story</a>
                  </li>
                  <li className={this.state.active1 ? 'li-menu intro' : 'li-menu'}>
                    <a href="javascript:;" onClick={() => this.setState({ active1: !this.state.active1 })}>
                      <i className="fas fa-sort-down" />
                      Sports
                    </a>

                    <ul className="submenu">
                      <li>
                        <a href="billiards.html">Billiards</a>
                      </li>
                      <li>
                        <a href="badminton.html">Badminton</a>
                      </li>
                      <li>
                        <a href="cricket.html">Cricket</a>
                      </li>
                      <li>
                        <a href="hockey.html">Hockey </a>
                      </li>
                      <li>
                        <a href="squash.html">Squash</a>
                      </li>
                      <li>
                        <a href="tennis.html">Tennis</a>
                      </li>
                      <li>
                        <a href="swimming.html">Swimming</a>
                      </li>
                    </ul>
                  </li>
                  <li className={this.state.active2 ? 'li-menu intro' : 'li-menu'}>
                    <a href="javascript:;" onClick={() => this.setState({ active2: !this.state.active2 })}>
                      <i className="fas fa-sort-down" />
                      Wellness
                    </a>
                    <ul className="submenu">
                      <li>
                        <a href="gym.html">Gymnasium</a>
                      </li>
                      <li>
                        <a href="yoga.html">Yoga</a>
                      </li>
                      <li>
                        <a href="other-wellness.html">Other facilities</a>
                      </li>
                    </ul>
                  </li>
                  <li className={this.state.active3 ? 'li-menu intro' : 'li-menu'}>
                    <a href="javascript:;" onClick={() => this.setState({ active3: !this.state.active3 })}>
                      <i className="fas fa-sort-down" />
                      Pursuit
                    </a>
                    <ul className="submenu">
                      <li>
                        <a href="library.html">Library</a>
                      </li>
                      <li>
                        <a href="cards.html">Cards</a>
                      </li>
                    </ul>
                  </li>
                  <li className={this.state.active4 ? 'li-menu intro' : 'li-menu'}>
                    <a href="javascript:;" onClick={() => this.setState({ active4: !this.state.active4 })}>
                      <i className="fas fa-sort-down" />
                      Social
                    </a>
                    <ul className="submenu">
                      <li>
                        <a href="yorker-bar.html">Bar</a>
                      </li>
                      <li>
                        <a href="restaurants.html">Dining Facilities</a>
                      </li>
                      <li>
                        <a href="banquets.html">Banquets</a>
                      </li>
                    </ul>
                  </li>
                  <li className={this.state.active5 ? 'li-menu intro' : 'li-menu'}>
                    <a href="javascript:;" onClick={() => this.setState({ active5: !this.state.active5 })}>
                      <i className="fas fa-sort-down" />
                      Stay
                    </a>
                    <ul className="submenu">
                      <li>
                        <a href="the-chambers.html">Chambers</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="events.html">Events</a>
                  </li>
                  <li className="btm-line" />
                  <li>
                    <a href="affiliated.html">Affiliate Clubs</a>
                  </li>
                  <li>
                    <a href="contact-us.html">Contact</a>
                  </li>
                  <li>
                    <a href="">Login</a>
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
  }
}

export default Header;
