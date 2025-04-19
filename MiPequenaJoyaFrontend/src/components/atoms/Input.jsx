import React from 'react';

const Input = ({ type, placeholder, value, onChange, name, className = '' }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            className={`form-control ${className}`}
        />
    );
};

export default Input;