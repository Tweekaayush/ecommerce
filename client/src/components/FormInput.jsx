import React from "react";

const FormInput = ({type, name, cls, value, handleChange, error}) => {
  return (
    <label htmlFor={name} className="form-label">
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className={cls}
      />
      <span>{name}</span>
      {error && (
        <p className="form-error-msg">{error}</p>
      )}
    </label>
  );
};

export default FormInput;
