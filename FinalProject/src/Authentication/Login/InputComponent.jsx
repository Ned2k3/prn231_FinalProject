import React from 'react';
import './Login.css'

const InputComponent = ({ label, value, onChange }) => {
  return (
    <div>
      <label className='input-label'>{label}</label>
      <div className='input-wrapper'>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default InputComponent;