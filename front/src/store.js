// import redux and persist plugins
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage';
import persistStore from 'reduxjs-toolkit-persist/es/persistStore';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'reduxjs-toolkit-persist/es/constants';

// import theme reducers
import settingsReducer from 'settings/settingsSlice';
import layoutReducer from 'layout/layoutSlice';
import langReducer from 'lang/langSlice';
import authReducer from 'auth/authSlice';
import razorReducer from 'razorpayment/razorSlice';
import menuReducer from 'layout/nav/main-menu/menuSlice';
import notificationReducer from 'layout/nav/notifications/notificationSlice';
import scrollspyReducer from 'components/scrollspy/scrollspySlice';


// eslint-disable-next-line no-unused-vars
import memberStatementReducer from 'views/member/viewStatementSlice';
// import changePasswordReducer from 'views/member/ChangePasswordSlice';
import changePasswordReducer from 'views/member/ChangePasswordSlice';
import adminDashboardReducer from 'views/admin/dashboardSlice';

import cartReducer from 'views/member/foodordering/cart/cartSlice';
import barCartReducer from 'views/member/foodordering/barCart/barCartSlice';

// import persist key
import { REDUX_PERSIST_KEY } from 'config.js';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializesState = JSON.stringify(state);
    localStorage.setItem('state', serializesState);
  } catch (err) {
    console.log(err);
  }
};
const persistConfig = {
  key: REDUX_PERSIST_KEY,
  storage,
  whitelist: ['menu', 'settings', 'lang'],
};
const persistedState = loadState();
// console.log('persistedState',persistedState);
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    settings: settingsReducer,
    layout: layoutReducer,
    lang: langReducer,
    auth: authReducer,
    razor: razorReducer,
    menu: menuReducer,
    notification: notificationReducer,
    scrollspy: scrollspyReducer,
    memberStatement: memberStatementReducer,
    adminDashboard: adminDashboardReducer,
    cart: cartReducer,
    changePassword: changePasswordReducer,
    barCart: barCartReducer,
  })
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  preloadedState: persistedState,
});

store.subscribe(() => {
  // console.log('storeState', store.getState());
  saveState(store.getState());
});

const persistedStore = persistStore(store);
export { store, persistedStore };
