import { useDeleteUserMutation } from '../../../redux/apis/userManagementApi';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';

const DeleteUser = ({ user }) => {
  const [doDeleteUser, { isLoading }] = useDeleteUserMutation();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    doDeleteUser(user.id)
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
        className="btn btn-sm btn-outline-danger"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Benutzer löschen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Soll der Benutzer{' '}
          <b>
            {user.firstname} {user.lastname} ({user.username})
          </b>{' '}
          wirklich gelöscht werden?
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

export default DeleteUser;
