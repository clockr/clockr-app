import { useEffect, useState } from 'react';
import { WorkingTimeType } from '../../types/WorkingTimeType';
import {
  useCreateWorkingTimeMutation,
  useUpdateWorkingTimeMutation,
} from '../../redux/apis/workingTimeApi';
import { useAppSelector } from '../../redux/hooks';
import { intervalToDuration } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStop, faPlay } from '@fortawesome/free-solid-svg-icons';

const Stopwatch = () => {
  const { id: userId } = useAppSelector((state) => state.auth);
  const [doCreateWorkingTime, { isLoading: isLoadingCreate }] =
    useCreateWorkingTimeMutation();
  const [doUpdateWorkingTime, { isLoading: isLoadingUpdate }] =
    useUpdateWorkingTimeMutation();

  const [workingTime, setWorkingTime] = useState<WorkingTimeType>(null);
  const [elapsedTime, setElapsedTime] = useState<string>('');

  useEffect(() => {
    if (workingTime?.startAt) {
      const updateElapsedTime = () => {
        const now = new Date();
        const duration = intervalToDuration({
          start: new Date(workingTime?.startAt?.toString()),
          end: now,
        });

        const formattedDuration = [
          (duration.hours ?? 0).toString().padStart(2, '0'),
          (duration.minutes ?? 0).toString().padStart(2, '0'),
          (duration.seconds ?? 0).toString().padStart(2, '0'),
        ].join(':');

        setElapsedTime(formattedDuration);
      };

      const intervalId = setInterval(updateElapsedTime, 1000);
      return () => clearInterval(intervalId);
    }
  }, [workingTime?.startAt]);

  const toggleWorkingTime = () => {
    if (workingTime) {
      doUpdateWorkingTime({
        userId,
        id: workingTime.id,
        payload: {
          ...workingTime,
          startAt: new Date(workingTime.startAt?.toString()),
          endAt: new Date(),
        },
      })
        .unwrap()
        .then(() => {
          setWorkingTime(null);
        });
    } else {
      doCreateWorkingTime({
        userId,
        payload: {
          startAt: new Date(),
          breakTime: 0,
        },
      })
        .unwrap()
        .then((response) => {
          setElapsedTime('00:00:00');
          setWorkingTime(response);
        });
    }
  };

  return (
    <div className="Stopwatch d-flex">
      <button
        onClick={toggleWorkingTime}
        disabled={isLoadingCreate || isLoadingUpdate}
        className="btn btn-outline-primary"
      >
        <FontAwesomeIcon icon={workingTime ? faStop : faPlay} size="lg" />
      </button>
      <div
        className={`px-2 border justify-content-center align-items-center d-flex${workingTime ? ' text-white' : ''}`}
        style={{ marginLeft: '-1px', minWidth: '100px' }}
      >
        {workingTime ? elapsedTime : '00:00:00'}
      </div>
    </div>
  );
};

export default Stopwatch;
