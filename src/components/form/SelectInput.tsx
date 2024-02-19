import { useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import FieldError from './FieldError';

const SelectInput = ({
  label,
  value,
  onChange,
  options = [],
  error = null,
  ...otherProps
}) => {
  const id = useMemo(() => uuid(), []);

  return (
    <div className="form-floating mb-3">
      <select
        className="form-control"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...otherProps}
      >
        {options.map((option, oI) => (
          <option value={option.value} key={oI} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      <label htmlFor={id}>{label}</label>
      <FieldError error={error} />
    </div>
  );
};

export default SelectInput;
