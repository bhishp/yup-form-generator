import * as yup from "yup";
import {PrettyTextInput} from "./PrettyTextInput";
import {createField} from "../../../src";

export const usernameSchema = yup
  .string()
  .required()
  .min(3, 'Your name is too short')
  .matches(/^\S*$/, 'You are not allowed space')
  .meta({
    label: 'Username',
    renderComp: PrettyTextInput,
  });

export const UsernameField = createField(usernameSchema);

