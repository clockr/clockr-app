import { useState } from 'react';
import { useCreateUserMutation } from '../../../redux/apis/userManagementApi';
import { Modal } from 'react-bootstrap';
import TextInput from '../../../components/form/TextInput';
import germanStates from '../../../config/germanStates';
import SelectInput from '../../../components/form/SelectInput';
import { useTranslation } from 'react-i18next';

const CreateUser = () => {
  const { t } = useTranslation();
  const [doCreateUser, { isLoading }] = useCreateUserMutation();

  const defaultFormValues = {
    username: '',
    firstname: '',
    lastname: '',
    germanState: 'MV',
    enabled: true,
    isArchived: false,
  };

  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [errors, setErrors] = useState(null);

  const handleOpen = () => {
    setFormValues(defaultFormValues);
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
    doCreateUser(formValues)
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
      <button
        type="button"
        onClick={handleOpen}
        className="btn btn-sm btn-outline-primary"
      >
        Benutzer erstellen
      </button>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Benutzer erstellen</Modal.Title>
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
            <SelectInput
              value={formValues.germanState}
              onChange={(val) => setFormValue('germanState', val)}
              label="Bundesland"
              error={errors?.germanState}
              options={germanStates.map((state) => ({
                value: state,
                label: t(`germanStates.${state}`),
              }))}
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

export default CreateUser;
