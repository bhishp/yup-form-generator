import React from "react";
import {useField, useFormikContext, FieldArray, Field } from "formik";
import {FieldRenderer, ObjectRenderer} from "../src/types";

export const PrettyTextInput: FieldRenderer = ({ label, name }) => {
  const [field, meta] = useField(name);

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <hr />
      <input type="text" id={name} {...field} />
      {meta.touched && meta.error ? (
        <div><b>{meta.error}</b></div>
      ) : null}
    </div>
  );
};

export const StringArray: FieldRenderer = ({ label, name }) => {
  const { values } = useFormikContext();
  const fieldValues: any[] = values[name];
  return (
    <div>
      <div>{label}</div>
      <FieldArray
        name={name}
        render={arrayHelpers => {

          return (
            <div>
              {fieldValues && fieldValues.length > 0 ? (
                fieldValues.map((v, index) => (
                  <div key={index}>
                    <Field name={`${name}.${index}`} />
                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(index)}
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => arrayHelpers.insert(index, '')}
                    >
                      +
                    </button>
                  </div>
                ))
              ) : (
                <button type="button" onClick={() => arrayHelpers.push('')}>
                  +
                </button>
              )}
            </div>
        )}}
      />
    </div>);
};

export const ColumnView: ObjectRenderer = ({ label, name, depth = 0, children }) => {
  return (
    <div style={{ margin: `${depth * 8}px`}}>
      <label htmlFor={name}>{label}</label>
      <hr />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {React.Children.map(children, (c, i) => (
          i % 2 === 0 ? <div style={{ flex: '1 1 67%' }}>{c}</div>
            : <div style={{ flex: '1 1 33%' }}>{c}</div>
        ))}
      </div>
    </div>
  );
};
