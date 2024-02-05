import { useGetYearQuery } from '../../../redux/apis/userApi';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { convertFloatToTimeString } from '../../../lib/date';

const Year = ({ userId, year }) => {
  const { data } = useGetYearQuery({ id: userId, year: year });

  return data ? (
    <div>
      <div className="row mt-4">
        <div className="col-12 col-mg-6 col-lg-4">
          <table className="table table-sm">
            <tbody>
              <tr>
                <td>Urlaub {year}</td>
                <td>{data.overview.vacationDays}</td>
              </tr>
              <tr>
                <td>Resturlaub aus {year - 1}</td>
                <td>{data.overview.vacationOffset}</td>
              </tr>
              <tr>
                <td>Überstunden aus {year - 1}</td>
                <td>
                  {convertFloatToTimeString(data.overview.workingHoursOffset)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-sm mt-4">
          <thead>
            <tr>
              <th>Monat</th>
              <th>Stunden/Woche</th>
              <th>Wochenarbeitstage</th>
              <th>SOLL Stunden/Monat</th>
              <th>Urlaub</th>
              <th>Krank</th>
              <th>Frühstück</th>
              <th>Mittag</th>
              <th>IST Stunden/Monat</th>
              <th>Saldo</th>
              <th>Stundenkonto</th>
            </tr>
          </thead>
          <tbody>
            {data.months?.map((month, mI) => (
              <tr key={mI}>
                <td>
                  {format(new Date(year, month.month - 1), 'MMMM', {
                    locale: de,
                  })}
                </td>
                <td>{convertFloatToTimeString(month.hoursPerWeek)}</td>
                <td>{month.daysPerWeek}</td>
                <td>{convertFloatToTimeString(month.targetHours)}</td>
                <td>{month.vacationCount}</td>
                <td>{month.illnessCount}</td>
                <td>{month.breakfastCount}</td>
                <td>{month.lunchCount}</td>
                <td>{convertFloatToTimeString(month.isHours)}</td>
                <td>{convertFloatToTimeString(month.difference)}</td>
                <td>{convertFloatToTimeString(month.totalDifference)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row mt-4">
        <div className="col-12 col-mg-6 col-lg-4">
          <table className="table table-sm">
            <tbody>
              <tr>
                <td>Resturlaub {year}</td>
                <td>{data.overview.vacationDaysRemaining}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : null;
};

export default Year;
