import React from "react";
import * as yup from "yup";
import withFormik from 'storybook-formik';

import {PrettyTextInput as PrettyTextInputComp} from "./PrettyTextInput";
import {UsernameField as UsernameFieldComp, usernameSchema} from "./Fields";

export default {
  title: 'Fields',
  decorators: [withFormik],
}

// TODO: Add stroybook-formik decorator here
export const PrettyTextInput = () => <PrettyTextInputComp label="Please write me a Haiku" name="haiku" />;
PrettyTextInput.story = {
  parameters: {
    formik: {
      initialValues: {
        haiku: ''
      }
    }
  }
};

export const UsernameField = () => <UsernameFieldComp name="username" />;
UsernameField.story = {
  parameters: {
    formik: {
      initialValues: {
        username: ''
      },
      validationSchema: yup.object({ username: usernameSchema }),
    }
  }
};
