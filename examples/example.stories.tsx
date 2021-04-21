import React from 'react';
import { storiesOf } from '@storybook/react';

import { SignupForm } from "../src";


storiesOf('Example', module)
  .add('default', () => (
    <SignupForm />
  ));
