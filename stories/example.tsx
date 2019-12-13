import React from "react";
import {useField} from "formik";
import {FieldRenderer} from "../src/types";

export const PrettyTextInput: FieldRenderer = (props) => {
  const { label, name } = props;
  const [field, meta] = useField(name);

  return (
    <div>
      This component's label is: {label}
      <hr />
      <input type="text" {...field} />
      {meta.touched && meta.error ? (
        <div><b>{meta.error}</b></div>
      ) : null}
    </div>
  );
};
