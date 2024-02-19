import { useUpdateManualEntryMutation } from '../../../../redux/apis/manualEntryApi';
import { useState } from 'react';
import { format, parse } from 'date-fns';
import manualEntries from './index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';
import TextInput from '../../../form/TextInput';
import SelectInput from '../../../form/SelectInput';
import { useTranslation } from 'react-i18next';

const availableTypes = ['WORKING_TIME', 'VACATION'];

const EditManualEntry = ({ manualEntry }) => {
  const { t } = useTranslation();
  const [doUpdateManualEntry, { isLoading }] = useUpdateManualEntryMutation();

  const defaultFormValues = {
    date: '',
    amount: '',
    type: availableTypes?.[0],
    note: '',
  };

  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [errors, setErrors] = useState(null);

  const handleOpen = () => {
    setFormValues({
      ...formValues,
      date: format(new Date(manualEntry.date), 'yyyy-MM-dd'),
      amount: manualEntry.amount,
      type: manualEntry.type,
      note: manualEntry.note,
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
    doUpdateManualEntry({
      userId: manualEntry?.userId,
      id: manualEntry?.id,
      payload: {
        ...formValues,
        amount: parseFloat(formValues.amount?.toString()),
        date: formValues.date
          ? parse(formValues.date, 'yyyy-MM-dd', new Date())?.toISOString()
          : '',
      },
    })
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
        className="btn btn-sm btn-link"
      >
        <FontAwesomeIcon icon={faPencil} />
      </button>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eintrag bearbeiten</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <TextInput
              value={formValues.date}
              onChange={(val) => setFormValue('date', val)}
              label="Datum"
              type="date"
              error={errors?.date}
            />
            <SelectInput
              value={formValues.type}
              onChange={(val) => setFormValue('type', val)}
              label="Typ"
              error={errors?.type}
              options={availableTypes?.map((type) => ({
                value: type,
                label: t(`manualEntry.type.${type}`),
              }))}
            />
            <TextInput
              value={formValues.amount}
              onChange={(val) => setFormValue('amount', val)}
              label="Wert"
              type="number"
              error={errors?.amount}
            />
            <TextInput
              value={formValues.note}
              onChange={(val) => setFormValue('note', val)}
              label="Notiz"
              error={errors?.note}
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

export default EditManualEntry;
