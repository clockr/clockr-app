import { useGetYearQuery } from '../../../../redux/apis/userApi';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import CreateManualEntry from './CreateManualEntry';
import { useTranslation } from 'react-i18next';
import EditManualEntry from './EditManualEntry';
import DeleteManualEntry from './DeleteManualEntry';

const ManualEntries = ({ userId, year }) => {
  const { data } = useGetYearQuery({ id: userId, year: year });
  const { t } = useTranslation();

  return data ? (
    <div>
      <h5 className="ps-1">Manuelle Einträge</h5>
      {data.overview?.manualEntries?.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Datum</th>
                <th>Eintrag</th>
                <th>Kommentar</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {data.overview?.manualEntries?.map((manualEntry, meI) => (
                <tr key={meI}>
                  <td>
                    {format(new Date(manualEntry.date), 'dd.MM.yy', {
                      locale: de,
                    })}
                  </td>
                  <td>
                    {manualEntry.amount?.toLocaleString('de-DE')}{' '}
                    {t(`manualEntry.type.${manualEntry.type}`)}
                  </td>
                  <td>{manualEntry.note}</td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <EditManualEntry manualEntry={manualEntry} />
                      <DeleteManualEntry manualEntry={manualEntry} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      <div className="mt-2 ps-1">
        <CreateManualEntry userId={userId} />
      </div>
    </div>
  ) : null;
};

export default ManualEntries;
