import React from 'react';

interface NumberInputProps {
    name: string;
    defaultValue?: string;
    required?: boolean;
    placeholder?: string;
    inputClassName?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
    name,
    defaultValue = '',
    required = false,
    placeholder = '',
    inputClassName = 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
}) => {
    return (
        <input
            id={name}
            type="tel"
            name={name}
            defaultValue={defaultValue}
            pattern="[0-9]*"
            inputMode="numeric"
            placeholder={placeholder}
            required={required}
            onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(
                    /[^0-9]/g,
                    ''
                );
            }}
            className={inputClassName}
        />
    );
};

export default NumberInput;
