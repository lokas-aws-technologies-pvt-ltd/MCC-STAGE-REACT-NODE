import { LAYOUT, MENU_BEHAVIOUR, NAV_COLOR, MENU_PLACEMENT, RADIUS, THEME_COLOR, USER_ROLE } from 'constants.js';

export const IS_DEMO = true;
export const IS_AUTH_GUARD_ACTIVE = true;
export const SERVICE_URL = '/app';
export const USE_MULTI_LANGUAGE = true;

// export const API_URL = 'http://localhost:5000/';
// export const API_URL = 'http://3.109.198.190:5000/';

 export const API_URL = 'https://webapistaging.madrascricketclub.org/';


// For detailed information: https://github.com/nfl/react-helmet#reference-guide
export const REACT_HELMET_PROPS = {
  defaultTitle: 'Madras Cricket Club',
  titleTemplate: '%s | Madras Cricket Club',
};

export const DEFAULT_PATHS = {
  APP: '/',
  HOME: '/home',
  ABOUTUS: '/aboutus',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  FORGOT_PIN: '/forgot-pin',
  RESET_PASSWORD: '/reset-password',
  LoginTrouble: '/loginTrouble',
  USER_WELCOME: '/dashboards/default',
  NOTFOUND: '/page-not-found',
  UNAUTHORIZED: '/unauthorized',
  INVALID_ACCESS: '/invalid-access',
  LOGINADMINMEMBER: '/loginadminmember',
};

export const DEFAULT_SETTINGS = {
  MENU_PLACEMENT: MENU_PLACEMENT.Vertical,
  MENU_BEHAVIOUR: MENU_BEHAVIOUR.Unpinned,
  LAYOUT: LAYOUT.Boxed,
  RADIUS: RADIUS.Flat,
  COLOR: THEME_COLOR.LightRed,
  NAV_COLOR: NAV_COLOR.Default,
  USE_SIDEBAR: false,
};

export const DEFAULT_USER = {
  id: 1,
  name: 'Lisa Jackson',
  thumb: '/img/profile/profile-9.webp',
  role: USER_ROLE.Editor,
  email: 'lisajackson@gmail.com',
};

export const REDUX_PERSIST_KEY = 'classic-dashboard';
