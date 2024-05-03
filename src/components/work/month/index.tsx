import { useGetMonthQuery } from '../../../redux/apis/userApi';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import DayItemToggle from './DayItemToggle';
import WorkingTimeItems from './WorkingTimeItems';
import { convertFloatToTimeString } from '../../../lib/date';
import HasRole from '../../auth/HasRole';
import LockMonth from './LockMonth';

const Month = ({ userId, year, month }) => {
  const { data } = useGetMonthQuery({ id: userId, year: year, month: month });

  return data ? (
    <>
      <HasRole role="ROLE_ADMIN">
        <div className="mt-3 mb-3">
          <LockMonth userId={userId} year={year} month={month} />
        </div>
      </HasRole>
      <div className="table-responsive mt-4">
        <table className="table">
          <thead>
            <tr>
              <th>Datum</th>
              <th style={{ paddingLeft: '40px' }}>Arbeitszeit</th>
              <th>Urlaub</th>
              <th>Krank</th>
              <th>Frühstück</th>
              <th>Mittagessen</th>
            </tr>
          </thead>
          <tbody>
            {data.days?.map((day, dI) => (
              <tr key={dI} style={{ verticalAlign: 'middle' }}>
                <td className={day.isWorkingDay ? '' : 'bg-light'}>
                  {format(day.date, 'EEE dd.MM.', { locale: de })}
                </td>
                <td className={day.isWorkingDay ? '' : 'bg-light'}>
                  <div className="d-flex">
                    <div>
                      <WorkingTimeItems
                        day={day}
                        userId={userId}
                        disabled={data.isLocked}
                      />
                    </div>
                    <div className="ms-auto me-2">
                      {convertFloatToTimeString(day.isHours)}
                    </div>
                  </div>
                </td>
                <td className={day.isWorkingDay ? '' : 'bg-light'}>
                  <DayItemToggle
                    item={day.vacationItem}
                    itemType="VACATION"
                    date={new Date(day.date)}
                    userId={userId}
                    disabled={data.isLocked}
                  />
                </td>
                <td className={day.isWorkingDay ? '' : 'bg-light'}>
                  <DayItemToggle
                    item={day.illnessItem}
                    itemType="ILLNESS"
                    date={new Date(day.date)}
                    userId={userId}
                    disabled={data.isLocked}
                  />
                </td>
                <td className={day.isWorkingDay ? '' : 'bg-light'}>
                  <DayItemToggle
                    item={day.breakfastItem}
                    itemType="BREAKFAST"
                    date={new Date(day.date)}
                    userId={userId}
                    disabled={data.isLocked}
                  />
                </td>
                <td className={day.isWorkingDay ? '' : 'bg-light'}>
                  <DayItemToggle
                    item={day.lunchItem}
                    itemType="LUNCH"
                    date={new Date(day.date)}
                    userId={userId}
                    disabled={data.isLocked}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-responsive mt-4 mb-4">
        <table className="table">
          <thead>
            <tr>
              <th>SOLL Stunden</th>
              <th>IST Stunden</th>
              <th>Frühstück</th>
              <th>Mittagessen</th>
              <th>Krank</th>
              <th>Urlaub</th>
              <th>Differenz</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{convertFloatToTimeString(data.result.targetHours)}</td>
              <td>{convertFloatToTimeString(data.result.isHours)}</td>
              <td>{data.result.breakfastCount}</td>
              <td>{data.result.lunchCount}</td>
              <td>{data.result.illnessCount}</td>
              <td>{data.result.vacationCount}</td>
              <td>{convertFloatToTimeString(data.result.difference)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  ) : null;
};

export default Month;
