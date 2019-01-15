/* @flow */
import withProps from 'recompose/withProps';
import { createStyledComponent, getResponsiveStyles } from '../styles';
import Flex, { FlexItem } from '../Flex';

import type { StyleValue } from '../styles/types';

export const GridRoot = withProps({ wrap: true })(
  createStyledComponent(
    Flex,
    { display: 'flex' },
    {
      filterProps: ['direction', 'inline', 'justifyContent']
    }
  )
);

const getFlexGrow = (value: number): number => (value ? 0 : 1);
const getWidth = (
  value: number,
  columns: number,
  gutter: number | string
): number | string =>
  value ? `calc(${(value / columns) * 100}% - ${gutter})` : 0;

export const GridItemRoot = withProps({ shrink: 0 })(
  createStyledComponent(
    FlexItem,
    ({ breakpoints, columns, gutterWidth, span, theme }) => {
      const gutter =
        typeof gutterWidth === 'number'
          ? `${gutterWidth}px`
          : theme[`space_inline_${gutterWidth}`] || gutterWidth;

      const mapValueToProperty = (
        property: string,
        value: StyleValue
      ): number | string => {
        const map = {
          flexGrow: getFlexGrow,
          width: (value) => getWidth(value, columns, gutter)
        };

        return map[property](value);
      };

      /*
       * [1] IE11 doesn't use the correct box-sizing model with the flex-basis
       *     property. The workaround is to set flex-basis to 'auto' and use 'width'
       *     instead.
       */
      return {
        flexBasis: 'auto', // [1]

        ...getResponsiveStyles({
          breakpoints,
          mapValueToProperty,
          styles: {
            flexGrow: span,
            width: span // [1]
          },
          theme
        })
      };
    },
    {
      filterProps: ['alignSelf', 'grow', 'inline', 'width']
    }
  )
);
