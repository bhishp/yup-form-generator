import { FC } from 'react';
import * as yup from 'yup';
import { SchemaDescription } from 'yup';
import {FieldAttributes} from "formik";

export type YupTypes = keyof yup.LocaleObject;

export interface YupExtendedDescriptionFields {
  [key: string]: ExtendedSchemaDescription;
}

export interface ExtendedSchemaDescription extends SchemaDescription {
  type: YupTypes;
  meta: ExtendedSchemaMeta;
}

export interface ExtendedObjectSchemaDescription extends ExtendedSchemaDescription{
  type: 'object';
}

export interface ExtendedSchemaMeta {
  /** A custom renderer for the field. Gets given FieldRendererProps */
  // TODO: Add array renderer
  renderComp: FieldRenderer | ObjectRenderer;
  /** A field label */
  label?: string;
}

// TODO: Change to accept any type of component (not just FC)
export type FieldRenderer = FC<FieldRendererProps>;

/** FAT are the extra FieldATtributes that can be passed to a field */
interface FieldRendererProps<FAT = any> {
  /** Field label */
  label?: string;
  /** Field name, used in Formik context */
  name: string;
  /** Props that can be passed to the underlying Formik Field */
  fieldProps?: FieldAttributes<FAT>,
}

// TODO: Change to accept any type of component (not just FC)
export type ObjectRenderer = FC<ObjectRendererProps>;

interface ObjectRendererProps {
  /** Passed from yup.mixed.label() */
  label?: string;
  name: string;
  /** Nesting depth of Schema */
  depth?: number;
}


export interface MapOf<T> {
  [key: string]: T;
}

