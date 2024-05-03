import { useGetMonthQuery } from '../../../redux/apis/userApi';
import HasRole from '../../auth/HasRole';
import {
  useLockMonthMutation,
  useUnlockMonthMutation,
} from '../../../redux/apis/userManagementApi';
import { FormCheck } from 'react-bootstrap';

const LockMonth = ({ userId, year, month }) => {
  const { data, isLoading: isLoadingData } = useGetMonthQuery({
    id: userId,
    year: year,
    month: month,
  });
  const [doLockMonth, { isLoading: isLoadingCreate }] = useLockMonthMutation();
  const [doUnlockMonth, { isLoading: isLoadingDelete }] =
    useUnlockMonthMutation();

  const handleChange = () => {
    if (!data.isLocked) {
      doLockMonth({ userId: userId, year: year, month: month });
    } else {
      doUnlockMonth({ userId: userId, year: year, month: month });
    }
  };

  return data ? (
    <HasRole role="ROLE_ADMIN">
      <div className="d-inline-flex items-center bg-light px-3 py-2 rounded">
        <FormCheck
          type="checkbox"
          checked={data.isLocked}
          onChange={handleChange}
          className="me-2"
          disabled={isLoadingCreate || isLoadingDelete || isLoadingData}
        />
        Monat sperren
      </div>
    </HasRole>
  ) : null;
};

export default LockMonth;
