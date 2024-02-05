import React from 'react';
import './theme/theme.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import Login from './routes/unauthorized/login';
import Work from './routes/authorized/work';
import Users from './routes/authorized/users';
import User from './routes/authorized/users/user';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Work />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/users/:id',
        element: <User />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
