import React from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_PATHS } from 'config.js';

const NavLogo = () => {
  return (
    <div className="logo position-relative">
      <Link to={DEFAULT_PATHS.APP}>
        {/* Logo can be added directly */}
        <img  style={{width:50,height:50}} src="/assets/images/logomcc.png" alt="logo" />
        {/*  Or added via css to provide different ones for different color themes */}

        {/* <div className="img" /> */}
      </Link>
    </div>
  );
};
export default React.memo(NavLogo);
