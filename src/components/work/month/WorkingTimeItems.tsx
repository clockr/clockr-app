import { useCallback, useEffect, useState } from 'react';
import WorkingTimeItem from './WorkingTimeItem';

const WorkingTimeItems = ({ userId, day }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let itemsToAdd = day.workingTimes ?? [];
    if (itemsToAdd?.length < 1 && day.isWorkingDay) {
      itemsToAdd = [{ startAt: '', endAt: '', breakTime: 0, note: '' }];
    }
    setItems(itemsToAdd);
  }, [day.workingTimes, day.isWorkingDay]);

  const addItem = useCallback(() => {
    setItems((items) => [
      ...items,
      { startAt: '', endAt: '', breakTime: 0, note: '' },
    ]);
  }, []);

  return day ? (
    <div>
      {items?.map((item, iI) => (
        <WorkingTimeItem
          item={item}
          userId={userId}
          date={new Date(day.date)}
          key={iI}
          addItem={addItem}
          showAddItem={iI === items.length - 1}
        />
      ))}
    </div>
  ) : null;
};

export default WorkingTimeItems;
