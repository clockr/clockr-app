import { useSetPasswordMutation } from '../../../redux/apis/userApi';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TextInput from '../../../components/form/TextInput';
import FieldError from '../../../components/form/FieldError';
import { useAppDispatch } from '../../../redux/hooks';
import { logout } from '../../../redux/slices/authSlice';

const SetPassword = () => {
  const [doSetPassword, { isLoading }] = useSetPasswordMutation();
  const dispatch = useAppDispatch();

  const { token } = useParams();

  const defaultFormValues = {
    password: '',
    passwordRepeat: '',
  };

  const [formValues, setFormValues] = useState(defaultFormValues);
  const [errors, setErrors] = useState<any>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const setFormValue = (key, value) => {
    setFormValues((fv) => ({
      ...fv,
      [key]: value,
    }));
  };

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    setErrors({});
    if (formValues.password !== formValues.passwordRepeat) {
      setErrors({ passwordRepeat: 'match' });
      return;
    }
    doSetPassword({
      token,
      password: formValues.password,
    })
      .unwrap()
      .then((response) => {
        setShowSuccess(true);
      })
      .catch((error) => {
        setErrors(error.data?.errors);
      });
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-12 col-md-4">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title mb-0">Passwort setzen</h4>
          </div>
          {showSuccess ? (
            <div className="card-body">
              <p>Dein Passwort wurde erfolgreich gespeichert!</p>
              <Link to={'/login'}>Zum Login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <p>Bitte gib dein gewünschtes Passwort an.</p>
                {errors?.token ? (
                  <p>
                    <FieldError error={errors.token} />
                  </p>
                ) : null}
                <TextInput
                  value={formValues.password}
                  onChange={(val) => setFormValue('password', val)}
                  label="Passwort"
                  type="password"
                  error={errors?.password}
                />
                <TextInput
                  value={formValues.passwordRepeat}
                  onChange={(val) => setFormValue('passwordRepeat', val)}
                  label="Passwort (wiederholen)"
                  type="password"
                  error={errors?.passwordRepeat}
                />
              </div>
              <div className="card-footer text-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  Speichern
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
