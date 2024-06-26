import { useCallback, useEffect, useState } from 'react';
import WorkingTimeItem from './WorkingTimeItem';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const WorkingTimeItems = ({ userId, day, disabled }) => {
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
        items
          ?.slice()
          ?.sort(
            (a, b) =>
              new Date(a.startAt)?.getTime() - new Date(b.startAt)?.getTime(),
          )
          ?.map((item, iI) => (
            <WorkingTimeItem
              item={item}
              userId={userId}
              date={new Date(day.date)}
              key={iI}
              addItem={addItem}
              showAddItem={iI === items.length - 1 && item?.id}
              handleEmptyDelete={removeItem}
              disabled={disabled}
            />
          ))
      ) : (
        <div style={{ minWidth: '30px' }}>
          <button
            type="button"
            className="btn btn-sm btn-link"
            onClick={addItem}
            disabled={disabled}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      )}
    </div>
  ) : null;
};

export default WorkingTimeItems;
