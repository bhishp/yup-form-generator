import { configure } from '@storybook/react';

// https://storybook.js.org/docs/configurations/typescript-config/#import-tsx-stories
// automatically import all files ending in *.stories.tsx
configure(require.context('../examples', true, /\.stories\.tsx?$/), module);
