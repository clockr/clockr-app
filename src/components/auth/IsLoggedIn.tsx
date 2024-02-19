import { getValidAuthToken } from '../../lib/cookies';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IsLoggedIn = ({ children }) => {
  const { username } = useAppSelector((state: RootState) => state.auth);
  const { token } = getValidAuthToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!username || !token) {
      navigate('/login');
    }
  }, [username, token, navigate]);

  return username && token ? children : null;
};

export default IsLoggedIn;
