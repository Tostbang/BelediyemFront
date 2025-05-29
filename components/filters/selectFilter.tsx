import React from 'react';

interface Option {
  id: string | number;
  name: string;
}

interface SelectFilterProps {
  keyPrefix: string;
  className?: string;
  value: string;
  onChange: (field: string, value: string) => void;
  placeholder: string;
  options: Option[];
  fieldName: string;
}

export default function SelectFilter({
  keyPrefix,
  className,
  value,
  onChange,
  placeholder,
  options,
  fieldName,
}: SelectFilterProps) {
  return (
    <select
      key={`${keyPrefix}-${value || 'default'}`}
      className={className}
      value={value || ''}
      onChange={(e) => onChange(fieldName, e.target.value)}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
}
