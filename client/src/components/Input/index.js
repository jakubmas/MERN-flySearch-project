import React from "react";
import PropTypes from "prop-types";

const index = ({
  onChangeHandler,
  value,
  type,
  name,
  placeholder,
  id,
  htmlFor,
}) => {
  return (
    <div className="form__group">
      <input
        type={type}
        name={name}
        className="form__input"
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={e => onChangeHandler(e)}
      />
      <label htmlFor={htmlFor} className="form__label">
        {placeholder}
      </label>
    </div>
  );
};

index.propTypes = {
  onChangeHandler: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
};

export default index;
