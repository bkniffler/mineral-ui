/* @flow */

import styled from '@emotion/styled';
import withPropsFn from 'recompose/withProps';
import componentStyleReset from './componentStyleReset';

import type { CreateStyledComponent, StyleFn } from './types';

const createStyledComponent: CreateStyledComponent = (
  element,
  styles,
  options = {}
) => {
  const { includeStyleReset, withProps, ...restOptions } = options;

  const outStyles: StyleFn = (props, context) => {
    let componentStyles =
      typeof styles === 'function' ? styles(props, context) : styles;

    if (includeStyleReset) {
      const resetStyles = componentStyleReset(props);
      if (Array.isArray(componentStyles)) {
        componentStyles.unshift(resetStyles);
      } else {
        componentStyles = {
          ...resetStyles,
          ...componentStyles
        };
      }
    }

    return componentStyles;
  };

  const styledComponent = styled(element, restOptions)(outStyles);

  return withProps ? withPropsFn(withProps)(styledComponent) : styledComponent;
};

export default createStyledComponent;
