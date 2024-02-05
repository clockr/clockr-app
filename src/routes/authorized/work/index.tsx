import UserWorkView from '../../../components/work/UserWorkView';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';

const Work = () => {
  const { id } = useAppSelector((state: RootState) => state.auth);
  return (
    <div className="mt-4">
      <UserWorkView id={id} />
    </div>
  );
};

export default Work;
