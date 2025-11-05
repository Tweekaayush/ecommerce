import React from "react";

const FormInput = ({type, name, cls='', value, handleChange, error, lblcls='', title}) => {
  return (
    <label htmlFor={name} className={`form-label ${lblcls}`}>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className={cls}
      />
      <span>{title}</span>
      {error && (
        <p className="form-error-msg">{error}</p>
      )}
    </label>
  );
};

export default FormInput;
