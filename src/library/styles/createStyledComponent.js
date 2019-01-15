/* @flow */

import styled from '@emotion/styled';

import type { CreateStyledComponent, StyleFn } from './types';

const createStyledComponent: CreateStyledComponent = (
  element,
  styles,
  options = {}
) => {
  const outStyles: StyleFn = (props, context) =>
    typeof styles === 'function' ? styles(props, context) : styles;

  return styled(element, options)(outStyles);
};

export default createStyledComponent;
