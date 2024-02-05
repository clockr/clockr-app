import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';
import { useDeleteContractMutation } from '../../../../redux/apis/userManagementApi';

const DeleteContract = ({ contract }) => {
  const [doDeleteContract, { isLoading }] = useDeleteContractMutation();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    doDeleteContract({ userId: contract.userId, id: contract.id })
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
          <Modal.Title>Vertrag löschen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Soll der Arbeitsvertrag wirklich gelöscht werden?
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

export default DeleteContract;
