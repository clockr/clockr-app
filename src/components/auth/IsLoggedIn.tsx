import { getValidAuthToken } from '../../lib/cookies';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';

const IsLoggedIn = ({ children }) => {
  const { username } = useAppSelector((state: RootState) => state.auth);
  const { token } = getValidAuthToken();
  return username && token ? children : null;
};

export default IsLoggedIn;
