import React from 'react';
import './theme/theme.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import Login from './routes/unauthorized/login';
import Work from './routes/authorized/work';
import Users from './routes/authorized/users';
import User from './routes/authorized/users/user';
import SetPassword from './routes/unauthorized/setPassword';
import ForgotPassword from './routes/unauthorized/forgotPassword';
import IsLoggedIn from './components/auth/IsLoggedIn';
import { Helmet } from 'react-helmet';
import config from "./config/config";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/forgotPassword',
        element: <ForgotPassword />,
      },
      {
        path: '/resetPassword/:token',
        element: <SetPassword />,
      },
      {
        path: '/register/:token',
        element: <SetPassword />,
      },
      {
        path: '/users',
        element: (
          <IsLoggedIn withNavigate>
            <Users />
          </IsLoggedIn>
        ),
      },
      {
        path: '/users/:id',
        element: (
          <IsLoggedIn withNavigate>
            <User />
          </IsLoggedIn>
        ),
      },
      {
        path: '/',
        element: (
          <IsLoggedIn withNavigate>
            <Work />
          </IsLoggedIn>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>{config.REACT_APP_TITLE}</title>
      </Helmet>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
