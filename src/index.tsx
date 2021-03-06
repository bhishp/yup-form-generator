import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';
import { FormikConfig } from 'formik/dist/types';
import * as yup from 'yup';
import React from 'react';
import {
  ExtendedSchemaDescription,
  YupExtendedDescriptionFields,
} from './types';
import { StringArray } from '../stories/example';

interface YupFormProps<Values extends FormikValues = FormikValues> {
  schema: yup.ObjectSchema;
  formik: FormikConfig<Values>;
}

type MockValues = any;

const renderField = (
  name: string,
  schema: ExtendedSchemaDescription
): JSX.Element => {
  const { label, type, meta } = schema;
  const RenderComp = meta && meta.renderComp;

  if (type === 'object') {
    const depth = name.split('.').length;
    const children = renderSchema(schema, name);
    return RenderComp ? (
      <RenderComp name={name} label={label} depth={depth} children={children} />
    ) : (
      <>{children}</>
    );
  }

  if (RenderComp) {
    return <RenderComp label={label} name={name} />;
  }

  let fieldComp: React.ReactNode = null;

  switch (type) {
    case 'string':
      fieldComp = <Field name={name} id={name} as="input" type="text" />;
      break;
    case 'number':
      fieldComp = <Field name={name} id={name} as="input" type="number" />;
      break;
    case 'boolean':
      fieldComp = <Field name={name} id={name} as="input" type="checkbox" />;
      break;
    case 'date':
      fieldComp = (
        <Field name={name} id={name} as="input" type="datetime-local" />
      );
      break;
    // case "object":
    case 'array':
      fieldComp = <StringArray name={name} />;
      break;
    case 'mixed':
    default:
      break;
  }

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      {fieldComp}
      <ErrorMessage name={name} />
    </div>
  );
};

const ns = (namespace: string | undefined, name: string) =>
  namespace ? `${namespace}.${name}` : name;

const renderSchema = (
  schema: ExtendedSchemaDescription,
  namespace?: string
): JSX.Element[] => {
  const fields = schema.fields as YupExtendedDescriptionFields;

  return Object.keys(fields).map(name => {
    return renderField(ns(namespace, name), fields[name]);
  });
};

export const YupForm: React.FC<YupFormProps<MockValues>> = ({
  schema,
  formik,
}) => {
  const description = schema.describe() as ExtendedSchemaDescription;
  const components = renderSchema(description);

  return (
    <Formik {...formik} validationSchema={schema}>
      {({ values, errors, touched }) => (
        <Form>
          {components}
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
