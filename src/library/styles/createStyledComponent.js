/* @flow */

import styled from '@emotion/styled';
import componentStyleReset from './componentStyleReset';

import type { CreateStyledComponent, StyleFn } from './types';

const createStyledComponent: CreateStyledComponent = (
  element,
  styles,
  options = {}
) => {
  const { includeStyleReset, ...restOptions } = options;

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

  return styled(element, restOptions)(outStyles);
};

export default createStyledComponent;
