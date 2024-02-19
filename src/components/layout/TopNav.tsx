import { Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/slices/authSlice';
import IsLoggedIn from '../auth/IsLoggedIn';
import HasRole from '../auth/HasRole';
import Stopwatch from '../work/Stopwatch';

const TopNav = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar
      expand="lg"
      className="bg-dark"
      data-bs-theme="dark"
      variant="primary"
    >
      <div className="container">
        <Link to="/" className="navbar-brand">
          {process.env.REACT_APP_TITLE}
        </Link>
        <IsLoggedIn>
          <div className="d-lg-none">
            <Stopwatch />
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">
                Arbeitszeit
              </NavLink>
              <HasRole role="ROLE_ADMIN">
                <NavLink to="/users" className="nav-link">
                  Benutzer
                </NavLink>
              </HasRole>
            </Nav>
            <Nav>
              <div className="me-3 d-none d-lg-block">
                <Stopwatch />
              </div>
              <Link to="/login" onClick={handleLogout} className="nav-link">
                Abmelden
              </Link>
            </Nav>
          </Navbar.Collapse>
        </IsLoggedIn>
      </div>
    </Navbar>
  );
};

export default TopNav;
