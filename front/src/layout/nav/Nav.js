import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import { MENU_BEHAVIOUR, MENU_PLACEMENT } from 'constants.js';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import NavUserMenu from './NavUserMenu';
import NavIconMenu from './NavIconMenu';
import MainMenu from './main-menu/MainMenu';
import MemberMainMenu from './member-menu/MemberMainMenu';
import AdminMenu from './admin-menu/AdminMenu';
import NavLogo from './NavLogo';
import NavMobileButtons from './NavMobileButtons';
import { menuChangeAttrMenuAnimate, menuChangeCollapseAll } from './main-menu/menuSlice';
import NavLanguageSwitcher from './NavLanguageSwitcher';
import { logout } from '../../auth/authSlice';

const DELAY = 80;

const Nav = () => {
  const { isLogin, currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const { navClasses, placementStatus, behaviourStatus, attrMobile, menuPadding } = useSelector((state) => state.menu);
  const mouseActionTimer = useRef(null);

  // Vertical menu semihidden state showing
  // Only works when the vertical menu is active and mobile menu closed
  const onMouseEnterDelay = () => {
    if (placementStatus.placementHtmlData === MENU_PLACEMENT.Vertical && behaviourStatus.behaviourHtmlData === MENU_BEHAVIOUR.Unpinned && attrMobile !== true) {
      dispatch(menuChangeCollapseAll(false));
      dispatch(menuChangeAttrMenuAnimate('show'));
    }
  };

  // Delayed one that hides or shows the menu. It's required to prevent collapse animation getting stucked
  const onMouseEnter = () => {
    if (mouseActionTimer.current) clearTimeout(mouseActionTimer.current);

    mouseActionTimer.current = setTimeout(() => {
      onMouseEnterDelay();
    }, DELAY);
  };

  // Vertical menu semihidden state hiding
  // Only works when the vertical menu is active and mobile menu closed
  const onMouseLeaveDelay = () => {
    if (placementStatus.placementHtmlData === MENU_PLACEMENT.Vertical && behaviourStatus.behaviourHtmlData === MENU_BEHAVIOUR.Unpinned && attrMobile !== true) {
      dispatch(menuChangeCollapseAll(true));
      dispatch(menuChangeAttrMenuAnimate('hidden'));
    }
  };

  const onMouseLeave = () => {
    if (mouseActionTimer.current) clearTimeout(mouseActionTimer.current);
    mouseActionTimer.current = setTimeout(() => {
      onMouseLeaveDelay();
    }, DELAY);
  };
  const logoutUser = () => {
    // localStorage.setItem('state',null);
    alert('Logout Successfully');
    dispatch(logout());
    // reset local storage
     // history.push('/');
  };
  return (
    <div id="nav" className={classNames('nav-container d-flex', navClasses)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div
        className="nav-content d-flex"
        style={placementStatus.placementHtmlData === MENU_PLACEMENT.Horizontal && menuPadding ? { paddingRight: menuPadding } : {}}
      >
        <NavLogo />

        <div className="name">{currentUser.name}</div>
        <ul className="list-unstyled list-inline text-center menu-icons">
          <li className="list-inline-item">
            <a href="/" id="logout" className="logout" title="Logout" onClick={logoutUser}>
              <CsLineIcons icon="logout" size="18" className="pin" />
            </a>
          </li>
        </ul>

        {currentUser.type === 'A' ? <AdminMenu /> : <MemberMainMenu />}

        <NavMobileButtons />
      </div>
      <div className="nav-shadow" />
    </div>
  );
};
export default React.memo(Nav);
