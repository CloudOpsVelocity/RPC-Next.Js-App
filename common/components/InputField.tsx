import React from "react";

type Props = {
  containerClass?: string;
  inputClass?: string;
  labelClass?: string;
  label?: string;
  onChange?: any;
  value?: any;
  id?: any;
  otherProps?: any;
  onBlur?: any;
  placeholder?: string;
  type?: string;
};

function InputField({
  containerClass,
  inputClass,
  onChange,
  onBlur,
  otherProps,
  placeholder,
  id,
  type,
  label,
  labelClass,
}: Props) {
  return (
    <div className={containerClass}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        type={type}
        className={inputClass}
        id={id}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
        {...otherProps}
      />
    </div>
  );
}

export default InputField;
