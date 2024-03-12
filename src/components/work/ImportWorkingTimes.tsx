import { useCreateWorkingTimeMutation } from '../../redux/apis/workingTimeApi';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';
import { Importer, ImporterField, deDE } from 'react-csv-importer';
import { parse } from 'date-fns';

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
                Beginn <i>Format: yyyy-MM-dd HH:mm</i>
              </li>
              <li>
                Ende <i>Format: yyyy-MM-dd HH:mm</i>
              </li>
              <li>
                Pause <i>optional, Beispiel: 0.5 für 30 min Pause</i>
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
                await doCreateWorkingTime({
                  userId,
                  payload: {
                    startAt: parse(
                      row.startAt?.toString(),
                      'yyyy-MM-dd HH:mm',
                      new Date(),
                    ).toISOString(),
                    endAt: parse(
                      row.endAt?.toString(),
                      'yyyy-MM-dd HH:mm',
                      new Date(),
                    ).toISOString(),
                    breakTime: row.breakTime
                      ? parseFloat(row.breakTime?.toString())
                      : 0,
                    note: row.note?.toString(),
                  },
                });
              }
            }}
            restartable={true}
          >
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
