import { FC } from 'react';
import * as yup from 'yup';
import { SchemaDescription } from 'yup';

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
  renderComp?: FieldRenderer | ObjectRenderer;
}

// TODO: Change to accept any type of component (not just FC)
export type FieldRenderer = FC<FieldRendererProps>;

interface FieldRendererProps {
  // TODO: Use a label within meta, rather than using the yup label
  /** Passed from yup.mixed.label() */
  label?: string;
  name: string;
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

