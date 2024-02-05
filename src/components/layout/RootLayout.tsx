import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';

const RootLayout = () => {
  return (
    <div>
      <TopNav />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
