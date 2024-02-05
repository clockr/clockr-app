import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';

const HasRole = ({ role, children }) => {
  const authState = useAppSelector((state: RootState) => state.auth);

  return authState?.roles?.includes(role) ? children : null;
};

export default HasRole;
