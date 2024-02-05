import {useState} from "react";
import {Modal} from "react-bootstrap";
import {useCreateContractMutation} from "../../../../redux/apis/userManagementApi";
import TextInput from "../../../../components/form/TextInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import WorkingDaysInput from "../../../../components/form/WorkingDaysInput";

const CreateContract = ({user}) => {

  const [doCreateContract, { isLoading }] = useCreateContractMutation();

  const defaultFormValues = {
    startAt: '',
    endAt: '',
    hoursPerWeek: '40',
    workingDays: '1111100',
    vacationDaysPerYear: '29',
  }

  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [errors, setErrors] = useState(null);

  const handleOpen = () => {
    setFormValues(defaultFormValues);
    setErrors(null);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const setFormValue = (key, value) => {
    setFormValues(fv => ({
      ...fv,
      [key]: value
    }))
  }

  const handleSubmit = (e) => {
    e?.preventDefault();
    setErrors(null);
    doCreateContract({userId: user?.id, payload: {
      ...formValues,
        hoursPerWeek: parseInt(formValues.hoursPerWeek),
        vacationDaysPerYear: parseInt(formValues.vacationDaysPerYear)
      }})
      .unwrap()
      .then(() => {
        handleClose();
      })
      .catch(error => {
        setErrors(error.data.errors);
      })
  }

  return (
    <>
      <button type="button" onClick={handleOpen} className="btn btn-link p-0">
        <FontAwesomeIcon icon={faPlus}/>
      </button>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Vertrag erstellen</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <TextInput value={formValues.startAt} onChange={val => setFormValue('startAt', val)} label="Beginn" type="date" error={errors?.startAt}/>
            <TextInput value={formValues.endAt} onChange={val => setFormValue('endAt', val)} label="Ende" type="date" error={errors?.endAt}/>
            <TextInput value={formValues.hoursPerWeek} onChange={val => setFormValue('hoursPerWeek', val)} label="Stunden pro Woche" type="number" error={errors?.hoursPerWeek}/>
            <TextInput value={formValues.vacationDaysPerYear} onChange={val => setFormValue('vacationDaysPerYear', val)} label="Urlaubrstage pro Jahr" type="number" error={errors?.vacationDaysPerYear}/>
            <WorkingDaysInput value={formValues.workingDays} onChange={val => setFormValue('workingDays', val)} label="Arbeitstage" error={errors?.workingDays}/>
          </Modal.Body>
          <Modal.Footer>
            <button className='btn btn-default' onClick={handleClose}>
              Abbrechen
            </button>
            <button
              type='submit'
              className='btn btn-primary'
              disabled={isLoading}
            >
              Speichern
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default CreateContract;