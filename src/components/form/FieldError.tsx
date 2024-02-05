import { useTranslation } from 'react-i18next';

const FieldError = ({ error }) => {
  const { t } = useTranslation();

  return error ? (
    <div className="text-danger mt-1">{t(`error.${error}`)}</div>
  ) : null;
};

export default FieldError;
