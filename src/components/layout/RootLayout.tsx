import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import Footer from './Footer';

const RootLayout = () => {
  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <TopNav />
      <div className="container flex-grow-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
