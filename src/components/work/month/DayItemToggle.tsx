import {
  useCreateDayItemMutation,
  useDeleteDayItemMutation,
} from '../../../redux/apis/dayItemApi';
import { Form } from 'react-bootstrap';

const DayItemToggle = ({ item, itemType, userId, date }) => {
  const [doCreateDayItem, { isLoading: isLoadingCreate }] =
    useCreateDayItemMutation();
  const [doDeleteDayItem, { isLoading: isLoadingDelete }] =
    useDeleteDayItemMutation();

  const handleChange = () => {
    if (item) {
      doDeleteDayItem({ userId: userId, id: item.id });
    } else {
      doCreateDayItem({
        userId: userId,
        payload: { type: itemType, day: date?.toISOString() },
      });
    }
  };

  return (
    <Form.Check
      type="checkbox"
      checked={!!item}
      onChange={handleChange}
      disabled={isLoadingCreate || isLoadingDelete}
    />
  );
};

export default DayItemToggle;
