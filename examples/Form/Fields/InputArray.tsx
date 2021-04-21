import React from "react";
import {Field, FieldArray, useFormikContext} from "formik";
import {FieldRenderer} from "../../../src/types";


export const InputArray: FieldRenderer = ({ label, name }) => {
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
