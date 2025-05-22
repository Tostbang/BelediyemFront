import React from 'react';

interface PhoneInputProps {
    name: string;
    defaultValue?: string;
    required?: boolean;
    placeholder?: string;
    inputClassName?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
    name,
    defaultValue = '',
    required = false,
    placeholder = 'Örn: (0412)-2294880 veya +90-5372558580',
    inputClassName = 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
}) => {
    return (
        <input
            id={name}
            type="tel"
            name={name}
            defaultValue={defaultValue}
            placeholder={placeholder}
            required={required}
            onInput={(e) => {
                // Only allow numbers, spaces, parentheses, plus signs, and hyphens
                e.currentTarget.value = e.currentTarget.value.replace(
                    /[^0-9\s()+\-]/g,
                    ''
                );
            }}
            className={inputClassName}
        />
    );
};

export default PhoneInput;
