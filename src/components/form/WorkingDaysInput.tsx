import FieldError from './FieldError';
import { useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { addDays, format, startOfWeek } from 'date-fns';
import { de } from 'date-fns/locale';

const WorkingDaysInput = ({ label, value, onChange, error = null }) => {
  const id = useMemo(() => uuid(), []);

  const replaceChar = (str, index, char) =>
    str.slice(0, index) + char + str.slice(index + 1);

  const toggleValue = (dayIndex) => {
    let newValue = `${value}`;
    newValue = replaceChar(
      newValue,
      dayIndex,
      value[dayIndex] === '1' ? '0' : '1',
    );
    onChange(newValue);
  };

  return (
    <div className="border rounded px-2 py-1">
      <small className="text-muted">{label}</small>
      <div>
        {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => (
          <div className="form-check form-check-inline" key={dayIndex}>
            <input
              className="form-check-input"
              type="checkbox"
              checked={value?.length > dayIndex && value[dayIndex] === '1'}
              id={`${id}-${dayIndex}`}
              onChange={() => toggleValue(dayIndex)}
            />
            <label className="form-check-label" htmlFor={`${id}-${dayIndex}`}>
              {format(
                addDays(
                  startOfWeek(new Date(), { locale: de, weekStartsOn: 1 }),
                  dayIndex,
                ),
                'EEE',
                { locale: de },
              )}
            </label>
          </div>
        ))}
      </div>
      <FieldError error={error} />
    </div>
  );
};

export default WorkingDaysInput;
