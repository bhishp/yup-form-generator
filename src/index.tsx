import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';
import { FormikConfig } from 'formik/dist/types';
import * as yup from 'yup';
import React from 'react';
import {
  ExtendedObjectSchemaDescription,
  ExtendedSchemaDescription,
  MapOf,
  YupExtendedDescriptionFields,
} from './types';
import { StringArray } from '../stories/example';

interface YupFormProps<Values extends FormikValues = FormikValues> {
  schema: yup.ObjectSchema;
  formik: FormikConfig<Values>;
}

type MockValues = any;

/** Transform a yup field to a JSX Element, or FieldsMap */
const transformField = (
  name: string,
  schema: ExtendedSchemaDescription
): JSX.Element | FieldsMap => {
  const { label, type, meta } = schema;
  const RenderComp = meta && meta.renderComp;

  if (type === 'object') {
    const depth = name.split('.').length;
    return transformYupObject(schema as ExtendedObjectSchemaDescription, name);
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

// const renderSchema = (
//   schema: ExtendedSchemaDescription,
//   namespace?: string
// ): JSX.Element[] => {
//   const fields = schema.fields as YupExtendedDescriptionFields;
//
//   return Object.keys(fields).map(name => {
//     return renderField(ns(namespace, name), fields[name]);
//   });
// };

// TODO: Not sure if this is the nicest way to do it...
//  try and think of a nicer way to differentiate between JSX.Element and FieldsMap
enum TransformedType {
  JSXElement,
  FieldsMap
}

type FieldsMap = MapOf<JSX.Element | FieldsMap> & { __type: TransformedType };

const transformYupObject = (object: ExtendedObjectSchemaDescription, namespace?: string): FieldsMap => {
  const fields = object.fields as YupExtendedDescriptionFields;

  const fieldsMap = Object.keys(fields).reduce((dict, name) => {
    dict[name] = transformField(ns(namespace, name), fields[name]);
    return dict;
  }, {} as FieldsMap);
  fieldsMap.__type = TransformedType.FieldsMap;
  return fieldsMap;
};

export const useYupForm = (schema: yup.ObjectSchema) => {
  // TODO: Protect against non object type passed
  const description = schema.describe() as ExtendedObjectSchemaDescription;
  return transformYupObject(description);
};

const isFieldsMap = (fm: FieldsMap | JSX.Element): fm is FieldsMap => (
  (fm as FieldsMap).__type === TransformedType.FieldsMap
);

export const BasicFieldsMapTemplate: React.FC<{ map: FieldsMap}> = ({ map }) => {
  const children = Object.keys(map)
    .filter(key => key !== '__type')
    .map(key => {
      const field = map[key];
      if (isFieldsMap(field)) {
        return <BasicFieldsMapTemplate map={field} />;
      }
      return field;
    });
  return <>{children}</>;
};

export const YupForm: React.FC<YupFormProps<MockValues>> = ({
  schema,
  formik,
}) => {
  // const description = schema.describe();
  const components = useYupForm(schema);
  console.log(components);

  return (
    <Formik {...formik} validationSchema={schema}>
      {({ values, errors, touched }) => (
        <Form>
          <BasicFieldsMapTemplate map={components} />
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
