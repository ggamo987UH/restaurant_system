import React from "react";
import styles from "./InputField.module.css";

const InputField = (props) => {
  const {
    label,
    type,
    name,
    placeholder,
    value,
    options,
    optionValueKey,
    optionKey,
    optionJsonKey,
    onChange,
  } = props;

  const renderInput = (inputType) => {
    switch (inputType) {
      case ["text", "date", "number"].find((type) => type === inputType):
        return (
          <input
            type={type}
            name={name}
            className={styles["input"]}
            style={{ width: "94%" }}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
          />
        );
      case "select":
        return (
          <select
            className={styles["input"]}
            name={name}
            value={value}
            onChange={onChange}
          >
            <option value={""}></option>>
            {options &&
              options.map((option) => (
                <option
                  key={optionKey ? option[optionKey] : option}
                  value={optionValueKey ? option[optionValueKey] : option}
                >
                  {optionJsonKey ? option[optionJsonKey] : option}
                </option>
              ))}
          </select>
        );
    }
  };

  return (
    <div className={styles["input-group"]}>
      {label && <label htmlFor={name}>{label}</label>}
      {renderInput(type)}
    </div>
  );
};

export default InputField;
