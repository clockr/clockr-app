import { useCallback, useEffect, useState } from 'react';
import WorkingTimeItem from './WorkingTimeItem';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const WorkingTimeItems = ({ userId, day }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let itemsToAdd = day.workingTimes ?? [];
    if (itemsToAdd?.length < 1 && day.isWorkingDay) {
      itemsToAdd = [
        { startAt: '', endAt: '', breakTime: 0, note: '', uuid: uuid() },
      ];
    }
    setItems(itemsToAdd);
  }, [day.workingTimes, day.isWorkingDay]);

  const addItem = useCallback(() => {
    setItems((items) => [
      ...items,
      { startAt: '', endAt: '', breakTime: 0, note: '', uuid: uuid() },
    ]);
  }, []);

  const removeItem = useCallback((uuid) => {
    setItems((items) => items.filter((i) => i.uuid !== uuid));
  }, []);

  return day ? (
    <div>
      {items?.length > 0 ? (
        items?.map((item, iI) => (
          <WorkingTimeItem
            item={item}
            userId={userId}
            date={new Date(day.date)}
            key={iI}
            addItem={addItem}
            showAddItem={iI === items.length - 1 && item?.id}
            handleEmptyDelete={removeItem}
          />
        ))
      ) : (
        <div style={{ minWidth: '30px' }}>
          <button
            type="button"
            className="btn btn-sm btn-link"
            onClick={addItem}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      )}
    </div>
  ) : null;
};

export default WorkingTimeItems;
