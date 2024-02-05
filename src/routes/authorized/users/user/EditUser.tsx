import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useUpdateUserMutation } from '../../../../redux/apis/userManagementApi';
import { Modal } from 'react-bootstrap';
import TextInput from '../../../../components/form/TextInput';

const EditUser = ({ user }) => {
  const [doUpdateUser, { isLoading }] = useUpdateUserMutation();

  const defaultFormValues = {
    username: '',
    firstname: '',
    lastname: '',
    enabled: true,
  };

  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [errors, setErrors] = useState(null);

  const handleOpen = () => {
    setFormValues({
      ...formValues,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
    });
    setErrors(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setFormValue = (key, value) => {
    setFormValues((fv) => ({
      ...fv,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    setErrors(null);
    doUpdateUser({ id: user.id, payload: formValues })
      .unwrap()
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        setErrors(error.data.errors);
      });
  };

  return (
    <>
      <button className="btn p-0 btn-link" onClick={handleOpen}>
        <FontAwesomeIcon icon={faPencil} />
      </button>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Benutzer bearbeiten</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <TextInput
              value={formValues.username}
              onChange={(val) => setFormValue('username', val)}
              label="E-Mail"
              type="email"
              error={errors?.username}
            />
            <TextInput
              value={formValues.firstname}
              onChange={(val) => setFormValue('firstname', val)}
              label="Vorname"
              type="text"
              error={errors?.firstname}
            />
            <TextInput
              value={formValues.lastname}
              onChange={(val) => setFormValue('lastname', val)}
              label="Nachname"
              type="text"
              error={errors?.lastname}
            />
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-default" onClick={handleClose}>
              Abbrechen
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              Speichern
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default EditUser;
