import { addDays, format, startOfWeek } from 'date-fns';
import { de } from 'date-fns/locale';
import DeleteContract from './DeleteContract';
import EditContract from './EditContract';

const ShowContract = ({ contract }) => {
  return (
    <div className="border rounded px-2 py-1 mb-3">
      <div className="d-flex">
        <strong>
          {contract.endAt ? (
            <>
              {format(new Date(contract.startAt), 'dd.MM.yyyy')} -{' '}
              {format(new Date(contract.endAt), 'dd.MM.yyyy')}
            </>
          ) : (
            <>seit {format(new Date(contract.startAt), 'dd.MM.yyyy')}</>
          )}
        </strong>
        <div className="ms-auto d-flex">
          <div className="me-1">
            <EditContract contract={contract} />
          </div>
          <DeleteContract contract={contract} />
        </div>
      </div>
      <div>{contract.hoursPerWeek} Stunden pro Woche</div>
      <div>{contract.vacationDaysPerYear} Urlaubstage pro Jahr</div>
      <div>
        Arbeitstage:{' '}
        {[0, 1, 2, 3, 4, 5, 6]
          .map((dayIndex) =>
            contract.workingDays[dayIndex] === '1'
              ? format(
                  addDays(
                    startOfWeek(new Date(), { locale: de, weekStartsOn: 1 }),
                    dayIndex,
                  ),
                  'EEE',
                  { locale: de },
                )
              : null,
          )
          .filter((e) => e !== null)
          ?.join(', ')}
      </div>
    </div>
  );
};

export default ShowContract;
