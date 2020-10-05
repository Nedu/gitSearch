import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Main, UserDetail } from '../../components';

export const RenderRoutes = ({ routes }) => {
    return (
        <Switch>
            {routes &&
                routes.map((route, _i) => {
                    return <RouteWithSubRoutes {...route} key={route.key} />;
                })
            }
        <Route component={() => <h1>Not Found!</h1>} />
        </Switch>
    );
};

const RouteWithSubRoutes = (route) => {
    return (
        <Route
            path={route.path}
            exact={route.exact}
            render={(props) => <route.component {...props} routes={route.routes} />}
        />
    );
};

const Routes = [
    { path: '/', key: 'APP_ROOT', exact: true, component: Main },
    { path: '/user/:id', key: 'USER_DETAILS', exact: true, component: UserDetail },
];

export default Routes;
