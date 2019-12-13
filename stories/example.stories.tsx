import React from 'react';
import { storiesOf } from '@storybook/react';
import * as yup from 'yup';

import {ExtendedSchemaMeta} from "../src/types";
import { generateDefaultInitialValues } from "../src/utils";
import {PrettyTextInput} from "./example";
import {YupForm} from "../src";

const forenameMeta: ExtendedSchemaMeta = { renderComp: PrettyTextInput };
const personalInfoSchema = yup.object({
  forename: yup.string().required().min(3, 'Your name is too short').label('Forename').meta(forenameMeta),
  surname: yup.string().required().label('Surname'),
  age: yup.number().required().min(0, 'Must be more than 0').max(500, "You can't be serious??").label('How old are you?'),
  alive: yup.boolean().label('Are you alive?'),
});
const storyFields = personalInfoSchema.describe().fields;
const storyInitialValues = generateDefaultInitialValues(storyFields);

storiesOf('Example', module)
  .add('default', () => (
    <YupForm
      initialValues={storyInitialValues}
      schema={personalInfoSchema}
      onSubmit={(v) => console.log(v)}
    />
  ));
