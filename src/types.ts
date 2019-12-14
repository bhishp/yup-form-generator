import { FC } from "react";
import * as yup from "yup";
import { SchemaDescription } from "yup";

export type YupTypes = keyof yup.LocaleObject;

export interface YupExtendedDescriptionFields {
  [key: string]: ExtendedSchemaDescription
}

export interface ExtendedSchemaDescription extends SchemaDescription {
  type: YupTypes;
  meta: ExtendedSchemaMeta;
}

export interface ExtendedSchemaMeta {
  /** A custom renderer for the field. Gets given FieldRendererProps */
  renderComp?: FieldRenderer;
}

// TODO: Change to accept any type of component (not just FC)
export type FieldRenderer = FC<FieldRendererProps>;

interface FieldRendererProps {
  /** Passed from yup.mixed.label() */
  label?: string;
  name: string;
}
