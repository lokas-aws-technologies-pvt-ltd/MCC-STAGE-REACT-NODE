import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Layout from 'layout/Layout';
import Layoutmcc from 'layoutmcc/index';
import RouteIdentifier from 'routing/components/RouteIdentifier';
import { getRoutes } from 'routing/helper';
import routesAndMenuItems from 'routes.js';
import Loading from 'components/loading/Loading';

const App = () => {
  const { currentUser, isLogin } = useSelector((state) => state.auth);

  // console.log('state',currentUser);

  const routes = useMemo(() => getRoutes({ data: routesAndMenuItems, isLogin, userRole: currentUser.type }), [isLogin, currentUser]);
  if (routes) {
    return (
      <React.StrictMode>
      <Layoutmcc>
        <RouteIdentifier routes={routes} fallback={<Loading />} />
      </Layoutmcc>
      </React.StrictMode>
    );
  }
  return <></>;
};

export default App;
