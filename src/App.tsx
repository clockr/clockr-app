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

const routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: (
          <IsLoggedIn>
            <Work />
          </IsLoggedIn>
        ),
      },
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
          <IsLoggedIn>
            <Users />
          </IsLoggedIn>
        ),
      },
      {
        path: '/users/:id',
        element: (
          <IsLoggedIn>
            <User />
          </IsLoggedIn>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
