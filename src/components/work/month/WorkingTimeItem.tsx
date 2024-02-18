import {
  useCreateWorkingTimeMutation,
  useDeleteWorkingTimeMutation,
  useUpdateWorkingTimeMutation,
} from '../../../redux/apis/workingTimeApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCoffee,
  faPlus,
  faSpinner,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { addDays, format, getHours, getMinutes, parse } from 'date-fns';
import { convertFloatToTimeString } from '../../../lib/date';

// Function to convert HH:mm string to hours as float
function convertToHours(timeString) {
  // Parse the time string to a Date object, using a reference date
  const referenceDate = new Date();
  const time = parse(timeString, 'HH:mm', referenceDate);

  // Extract hours and minutes
  const hours = getHours(time);
  const minutes = getMinutes(time);

  // Convert minutes to a fraction of an hour and add to hours
  return hours + minutes / 60;
}

const WorkingTimeItem = ({
  item,
  userId,
  date,
  addItem,
  showAddItem,
  handleEmptyDelete,
}) => {
  const [doCreateWorkingTime, { isLoading: isLoadingCreate }] =
    useCreateWorkingTimeMutation();
  const [doUpdateWorkingTime, { isLoading: isLoadingUpdate }] =
    useUpdateWorkingTimeMutation();
  const [doDeleteWorkingTime, { isLoading: isLoadingDelete }] =
    useDeleteWorkingTimeMutation();

  const saveTimeoutId = useRef<any>();

  const defaultFormValues = {
    startAt: '',
    endAt: '',
    breakTime: '',
    note: '',
  };

  const [formValues, setFormValues] = useState(defaultFormValues);

  useEffect(() => {
    setFormValues((formValues) => ({
      ...formValues,
      startAt:
        item.startAt && item.startAt.length > 0
          ? format(new Date(item.startAt), 'HH:mm')
          : '',
      endAt:
        item.endAt && item.endAt.length > 0
          ? format(new Date(item.endAt), 'HH:mm')
          : '',
      breakTime: item.breakTime
        ? convertFloatToTimeString(item.breakTime)
        : '00:00',
      note: item.note,
    }));
  }, [item]);

  const setFormValue = (key, value) => {
    setFormValues((fv) => ({
      ...fv,
      [key]: value,
    }));
    if (saveTimeoutId.current) {
      clearTimeout(saveTimeoutId.current);
    }
  };

  const handlePrepareSave = () => {
    if (saveTimeoutId.current) {
      clearTimeout(saveTimeoutId.current);
    }
    saveTimeoutId.current = setTimeout(() => handleSave(), 1000);
  };

  const handleSave = () => {
    if (!formValues.startAt || formValues.startAt.length !== 5) return;
    let dataToSend = {
      ...formValues,
      startAt: parse(
        `${format(date, 'yyyy-MM-dd')} ${formValues.startAt}`,
        'yyyy-MM-dd HH:mm',
        new Date(),
      ).toISOString(),
      endAt:
        formValues.endAt && formValues.endAt.length === 5
          ? parse(
              `${format(date, 'yyyy-MM-dd')} ${formValues.endAt}`,
              'yyyy-MM-dd HH:mm',
              new Date(),
            ).toISOString()
          : '',
      breakTime:
        formValues.breakTime && formValues.breakTime.length === 5
          ? convertToHours(formValues.breakTime)
          : 0,
    };
    if (
      dataToSend.endAt?.length > 0 &&
      new Date(dataToSend.endAt) < new Date(dataToSend.startAt)
    ) {
      dataToSend.endAt = addDays(new Date(dataToSend.endAt), 1).toISOString();
    }

    if (item.id) {
      doUpdateWorkingTime({ userId: userId, id: item.id, payload: dataToSend });
    } else {
      doCreateWorkingTime({ userId: userId, payload: dataToSend });
    }
  };

  const handleDelete = () => {
    if (item.id) {
      doDeleteWorkingTime({ userId: userId, id: item.id });
    }
    if (handleEmptyDelete) {
      handleEmptyDelete(item.uuid);
    }
  };

  return (
    <div className="d-flex align-items-center">
      <div style={{ minWidth: '30px' }}>
        {showAddItem ? (
          <button
            type="button"
            className="btn btn-sm btn-link"
            onClick={addItem}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        ) : null}
      </div>
      <input
        type="time"
        className="form-control form-control-sm"
        value={formValues.startAt}
        onChange={(e) => setFormValue('startAt', e.target.value)}
        onBlur={handlePrepareSave}
      />
      <div className="mx-2">-</div>
      <input
        type="time"
        className="form-control form-control-sm"
        value={formValues.endAt}
        onChange={(e) => setFormValue('endAt', e.target.value)}
        onBlur={handlePrepareSave}
      />
      <div className="ms-3 me-2">
        <FontAwesomeIcon icon={faCoffee} className="text-muted" />
      </div>
      <input
        type="time"
        className="form-control form-control-sm"
        value={formValues.breakTime}
        onChange={(e) => setFormValue('breakTime', e.target.value)}
        onBlur={handlePrepareSave}
      />
      <input
        type="text"
        className="form-control form-control-sm ms-3"
        placeholder="Beschreibung"
        value={formValues.note}
        onChange={(e) => setFormValue('note', e.target.value)}
        onBlur={handlePrepareSave}
      />
      <div className="ms-2" style={{ minWidth: 100 }}>
        {item.id || handleEmptyDelete ? (
          <button
            type="button"
            className="btn btn-sm btn-link text-warning"
            onClick={handleDelete}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        ) : null}
      </div>
      <div className="ms-2">
        <FontAwesomeIcon
          icon={faSpinner}
          spin={true}
          style={{
            opacity:
              isLoadingCreate || isLoadingUpdate || isLoadingDelete ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
};

export default WorkingTimeItem;
