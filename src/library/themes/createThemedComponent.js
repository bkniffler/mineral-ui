/* @flow */
import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import wrapDisplayName from 'recompose/wrapDisplayName';
import withTheme from './withTheme';
import ThemeProvider from './ThemeProvider';

import type { Theme } from './types';

export default function createThemedComponent(
  WrappedComponent: React$ComponentType<*>,
  theme: Theme<>
) {
  const Wrapper = (props, context) => {
    const outTheme =
      typeof theme === 'function' ? theme(props, context) : theme;
    const { theme: ignore, ...outProps } = props;

    return (
      <ThemeProvider theme={outTheme}>
        <WrappedComponent {...outProps} />
      </ThemeProvider>
    );
  };

  // $FlowFixMe - `WrappedComponent.propTypes` missing in `React.AbstractComponentStatics`
  Wrapper.propTypes = WrappedComponent.propTypes;

  Wrapper.displayName = wrapDisplayName(WrappedComponent, 'Themed');

  hoistNonReactStatics(Wrapper, WrappedComponent);

  return withTheme(Wrapper);
}
