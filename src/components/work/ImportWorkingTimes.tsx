import { useCreateWorkingTimeMutation } from '../../redux/apis/workingTimeApi';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';
import { Importer, ImporterField, deDE } from 'react-csv-importer';
import { addDays, getHours, getMinutes, parse } from 'date-fns';

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

const ImportWorkingTimes = ({ userId }) => {
  const [doCreateWorkingTime] = useCreateWorkingTimeMutation();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="btn btn-sm btn-outline-primary"
      >
        <FontAwesomeIcon icon={faUpload} className="me-2" />
        Arbeitszeiten importieren
      </button>
      <Modal show={open} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Arbeitszeiten importieren</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Du kannst Arbeitszeiten importieren, z.B. aus einem anderen
          Time-Tracking-Tool.
          <div className="alert alert-info mt-3">
            Die Datei muss im csv-Format vorliegen und folgende Spalten
            enthalten:
            <ol className="mb-0">
              <li>
                Datum <i>Format: yyyy-MM-dd</i>
              </li>
              <li>
                Beginn <i>Format: HH:mm</i>
              </li>
              <li>
                Ende <i>Format: HH:mm</i>
              </li>
              <li>
                Pause <i>optional, Beispiel: 00:30 für 30 min Pause</i>
              </li>
              <li>
                Beschreibung <i>optional</i>
              </li>
            </ol>
          </div>
          <Importer
            locale={deDE}
            dataHandler={async (rows, { startIndex }) => {
              for (const row of rows) {
                let dataToSend = {
                  startAt: parse(
                    `${row.date?.toString()} ${row.startAt?.toString()}`,
                    'yyyy-MM-dd HH:mm',
                    new Date(),
                  ).toISOString(),
                  endAt: parse(
                    `${row.date?.toString()} ${row.endAt?.toString()}`,
                    'yyyy-MM-dd HH:mm',
                    new Date(),
                  ).toISOString(),
                  breakTime:
                    row.breakTime && row.breakTime.toString().length === 5
                      ? convertToHours(row.breakTime?.toString())
                      : 0,
                  note: row.note?.toString(),
                };
                if (
                  dataToSend.endAt?.length > 0 &&
                  new Date(dataToSend.endAt) < new Date(dataToSend.startAt)
                ) {
                  dataToSend.endAt = addDays(
                    new Date(dataToSend.endAt),
                    1,
                  ).toISOString();
                }
                await doCreateWorkingTime({
                  userId,
                  payload: dataToSend,
                });
              }
            }}
            restartable={true}
          >
            <ImporterField name="date" label="Datum" />
            <ImporterField name="startAt" label="Beginn" />
            <ImporterField name="endAt" label="Ende" />
            <ImporterField name="breakTime" label="Pause" optional />
            <ImporterField name="note" label="Notiz" optional />
          </Importer>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ImportWorkingTimes;
