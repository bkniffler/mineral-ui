/* @flow */
import styled from '@emotion/styled';
import { ThemeProvider } from '../../../../../../library/themes';
import Sample from '../../common/Sample';

const DemoLayout = styled('div')(({ theme }) => ({
  fontFamily: theme.fontFamily,

  '& > *': {
    marginRight: '0.5rem'
  }
}));

export default {
  id: 'theme-provider',
  title: 'Using Mineral UI Styles',
  description: `Wrap components in a \`ThemeProvider\` to apply the theme to that section of the component tree. That theme will be shallowly merged with the parent theme.`,
  scope: { DemoLayout, ThemeProvider, Sample },
  source: `
    <DemoLayout>
      <ThemeProvider theme={{ color: 'tomato' }}>
        <Sample />
      </ThemeProvider>
    </DemoLayout>
  `
};
