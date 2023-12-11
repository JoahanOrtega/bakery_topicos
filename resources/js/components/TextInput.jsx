import React from 'react';

function TextInput({ type = 'text', value = '', onChange, className = '', ...props }) {
    return (
        <input
            {...props}
            type={type}
            value={value}
            onChange={onChange}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
        />
    );
}

export default TextInput;
