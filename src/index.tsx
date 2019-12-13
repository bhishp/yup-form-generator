import {ErrorMessage, Field, Form, Formik, FormikValues} from "formik";
import {FormikConfig} from "formik/dist/types";
import * as yup from "yup";
import React, {Fragment} from "react";
import {YupExtendedDescriptionFields} from "./types";


interface YupFormProps<Values extends FormikValues = FormikValues> extends FormikConfig<Values> {
  schema: yup.ObjectSchema;
}

type MockValues = any;

export const YupForm: React.FC<YupFormProps<MockValues>> = ({ schema, ...formikProps }) => {

  const description = schema.describe();
  const fields = description.fields as YupExtendedDescriptionFields;

  const fieldComponents = Object.keys(fields).map(name => {
    const { label, type, meta: schemaMeta , ...field } = fields[name];

    if (schemaMeta && schemaMeta.renderComp) {
      return <schemaMeta.renderComp label={label} name={name} />
    }

    let fieldComp: React.ReactNode = null;

    switch (type) {
      case 'string':
        fieldComp = <Field name={name} as="input" type="text" />;
        break;
      case "number":
        fieldComp = <Field name={name} as="input" type="number" />;
        break;
      case "boolean":
        fieldComp = <Field name={name} as="input" type="checkbox" />;
        break;
      case "array":
      case "date":
      case "mixed":
      case "object":
      default:
        break;
    }

    return (
      <div>
        <label htmlFor={name}>{label}</label>
        {fieldComp}
        <ErrorMessage name={name} />
      </div>
    )
  });

  return (
    <Formik
      {...formikProps}
      validationSchema={schema}
    >
      {({ values, errors, touched }) => (
        <Form>
          {fieldComponents.map(comp => (
            <Fragment key={comp.props.name}>{comp}</Fragment>
          ))}
          <button type="submit">Submit</button>
          <h3>Details</h3>
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
          <pre>{JSON.stringify(touched, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
};
