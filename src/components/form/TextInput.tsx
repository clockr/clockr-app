import { useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import FieldError from './FieldError';

const TextInput = ({
  label,
  value,
  onChange,
  type = 'text',
  error = null,
  ...otherProps
}) => {
  const id = useMemo(() => uuid(), []);

  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        className="form-control"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=""
        {...otherProps}
      />
      <label htmlFor={id}>{label}</label>
      <FieldError error={error} />
    </div>
  );
};

export default TextInput;
