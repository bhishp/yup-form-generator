import React from 'react';
import { storiesOf } from '@storybook/react';
import * as yup from 'yup';

import {ExtendedSchemaMeta} from "../src/types";
import { generateDefaultInitialValues } from "../src/utils";
import {PrettyTextInput} from "./example";
import {YupForm} from "../src";
import {FormikConfig} from "formik";

const forenameMeta: ExtendedSchemaMeta = { renderComp: PrettyTextInput };

const personalInfoSchema = yup.object({
  forename: yup.string().required().min(3, 'Your name is too short').label('Forename').meta(forenameMeta),
  surname: yup.string().required().label('Surname'),
  age: yup.number().required().min(0, 'Must be more than 0').max(500, "You can't be serious??").label('How old are you?'),
  alive: yup.boolean().label('Are you alive?'),
  dob: yup.date().label('How old are you?'),
  physical: yup.object({
    height: yup.number().required().label('Your height?'),
    hairLength: yup.string().oneOf(['Bald', 'Short', 'Medium', 'Long']).required().label('How long is your hair?'),
    face: yup.object({
      eyeColour: yup.string().label('Eye colour'),
      headSize: yup.number().label('How big is your head?'),
    })
  }).label('Physical Characteristics'),
  animals: yup.array(yup.string()).label('What animals do you have?')
});
const storyFields = personalInfoSchema.describe().fields;
type Values = yup.InferType<typeof personalInfoSchema>;
const storyInitialValues = generateDefaultInitialValues(storyFields);

const formikConfig: FormikConfig<Values> = {
  initialValues: storyInitialValues,
  onSubmit: (v) => console.log(v),
};


storiesOf('Example', module)
  .add('default', () => (
    <YupForm
      schema={personalInfoSchema}
      formik={formikConfig}
    />
  ));
