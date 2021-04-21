import React from "react";
import {FieldRenderer} from "../../../src/types";
import {useField} from "formik";

const style = {
  wrapper: {
    border: '1px solid #e3e3e3',
    margin: '0 8px',
    padding: '8px',
    width: '160px',
  },
  label: {
    display: 'block',
    fontWeight: 700,
    borderBottom: '1px dashed #e4e4e4',
    marginBottom: '12px',
  },
  error: {
    color: 'red',
    fontSize: '12px'
  }
};

export const PrettyTextInput: FieldRenderer = ({ label, name }) => {
  const [field, meta] = useField(name);

  console.log({ name });

  return (
    <div style={style.wrapper}>
      <label htmlFor={name} style={style.label}>{label}</label>
      <input type="text" id={name} {...field} />
      {meta.touched && meta.error ? (
        <div style={style.error}><b>{meta.error}</b></div>
      ) : null}
    </div>
  );
};
