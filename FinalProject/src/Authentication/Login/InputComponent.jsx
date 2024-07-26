import React, { useEffect, useState } from 'react';
import './Login.css'
import PropTypes from 'prop-types';

const InputComponent = ({ label = 'default', value = '', type = 'text', onChange, classNamed = 'input-class' }) => {
  const [labelClass, setLabelClass] = useState("input-label");
  const [inputClass, setInputClass] = useState(`${classNamed}`);

  const handleInputFocus = () => {
    setLabelClass("input-label selected");
    setInputClass(`${classNamed} selected`);
  }

  const handleInputBlur = () => {
    if(value === ''){
      setLabelClass("input-label");
      setInputClass(`${classNamed}`);
    }
  }

  const handleChange = (event) => {
    onChange(event.target.value); // Notify parent of value change
  };


  useEffect(() => {
    if(value !== ""){
      setLabelClass("input-label selected");
    }
  }, [value])

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className='input-wrapper'>
        <input
          className={inputClass}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          required
        />
      </div>
    </div>
  );
};

InputComponent.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default InputComponent;