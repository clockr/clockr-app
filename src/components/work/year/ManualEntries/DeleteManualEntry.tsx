import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';
import { useDeleteManualEntryMutation } from '../../../../redux/apis/manualEntryApi';

const DeleteManualEntry = ({ manualEntry }) => {
  const [doDeleteManualEntry, { isLoading }] = useDeleteManualEntryMutation();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    doDeleteManualEntry({ userId: manualEntry.userId, id: manualEntry.id })
      .unwrap()
      .then(() => {
        handleClose();
      });
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="btn btn-sm btn-link text-danger p-0"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eintrag löschen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Soll der Eintrag wirklich gelöscht werden?
          <br />
          Diese Aktion kann nicht rückgängig gemacht werden.
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-default" onClick={handleClose}>
            Abbrechen
          </button>
          <button
            type="submit"
            className="btn btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Löschen
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteManualEntry;
