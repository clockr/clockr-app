import { useForgotPasswordMutation } from '../../../redux/apis/userApi';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '../../../components/form/TextInput';

const ForgotPassword = () => {
  const [doForgotPassword, { isLoading }] = useForgotPasswordMutation();

  const [username, setUsername] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    doForgotPassword(username)
      .unwrap()
      .then(() => {
        setShowSuccess(true);
      });
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-12 col-md-4">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title mb-0">Passwort vergessen</h4>
          </div>
          {showSuccess ? (
            <div className="card-body">
              <p>
                Falls wir deine E-Mail-Adresse bei uns existiert haben wir dir
                eine E-Mail mit einem Link zum Zurücksetzen deines Passworts
                zugeschickt.
              </p>
              <Link to={'/login'}>Zurück zum Login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <p>
                  Bitte gibt deine E-Mail-Adresse an, damit wir dir einen Link
                  zum Zurücksetzen des Passworts zuschicken können.
                </p>
                <TextInput
                  value={username}
                  onChange={(val) => setUsername(val)}
                  label="E-Mail-Adresse"
                  required
                />
              </div>
              <div className="card-footer d-flex align-items-center">
                <Link to="/login" className="me-auto">
                  Zurück zum Login
                </Link>
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

export default ForgotPassword;
