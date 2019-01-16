/* @flow */

import styled from '@emotion/styled';

import type { CreateStyledComponent } from './types';

const createStyledComponent: CreateStyledComponent = (
  element,
  styles,
  options = {}
) => styled(element, options)(styles);

export default createStyledComponent;
