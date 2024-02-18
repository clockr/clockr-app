import { useState } from 'react';
import TextInput from '../../../components/form/TextInput';
import { useLoginMutation } from '../../../redux/apis/authApi';
import { Link, useNavigate } from 'react-router-dom';
import GeneralError from '../../../components/form/GeneralError';

const Login = () => {
  const navigate = useNavigate();
  const [doLogin, { isLoading }] = useLoginMutation();

  const defaultFormValues = {
    username: '',
    password: '',
  };

  const [formValues, setFormValues] = useState(defaultFormValues);
  const [hasLoginError, setHasLoginError] = useState(false);

  const setFormValue = (key, value) => {
    setFormValues((fv) => ({
      ...fv,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    setHasLoginError(false);
    doLogin(formValues)
      .unwrap()
      .then((response) => {
        navigate('/');
      })
      .catch((error) => {
        setHasLoginError(true);
      });
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-12 col-md-4">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title mb-0">Login</h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <p>Bitte melde dich mit deinen Zugangsdaten an.</p>
              <TextInput
                value={formValues.username}
                onChange={(val) => setFormValue('username', val)}
                label="E-Mail"
                type="email"
              />
              <TextInput
                value={formValues.password}
                onChange={(val) => setFormValue('password', val)}
                label="Passwort"
                type="password"
              />
              {hasLoginError ? (
                <GeneralError message="Beim Anmelden ist ein Fehler auftreten. Bitte überprüfe deine Daten und versuche es erneut." />
              ) : null}
            </div>
            <div className="card-footer d-flex align-items-center">
              <Link to="/forgotPassword" className="me-auto">
                Passwort vergessen?
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                Anmelden
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
