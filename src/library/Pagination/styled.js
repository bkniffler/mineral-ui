/* @flow */
import styled from '@emotion/styled';
import withProps from 'recompose/withProps';
import { componentStyleReset } from '../styles';
import { createThemedComponent } from '../themes';
import Flex, { FlexItem } from '../Flex';
import TextInput from '../TextInput';
import Button from '../Button';

import { paginationTheme } from './themes';

export const PaginationRoot = withProps({ element: 'nav' })(
  styled(Flex)(({ theme: baseTheme }) => {
    const theme = paginationTheme(baseTheme);

    return {
      ...componentStyleReset(baseTheme),

      flexWrap: 'wrap-reverse',
      marginBottom: `-${theme.Pagination_gutterWidth}`,

      '& > *': {
        marginBottom: theme.Pagination_gutterWidth
      }
    };
  })
);

export const PagesRoot = styled(FlexItem)(({ theme: baseTheme }) => {
  const theme = paginationTheme(baseTheme);
  const rtl = theme.direction === 'rtl';
  const middleMargin = rtl ? 'marginLeft' : 'marginRight';
  return {
    '& > button, & > span': {
      '&:not(:last-child)': {
        [middleMargin]: theme.Pagination_gutterWidth
      }
    }
  };
});

export const PagesEllipsisButton = createThemedComponent(
  Button,
  ({ theme }) => ({
    color_disabled: theme.color_theme
  })
);

export const PageJumperNumberInput = styled(TextInput)({
  '& > input': {
    MozAppearance: 'textfield',

    '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
      WebkitAppearance: 'none',
      margin: 0
    }
  }
});

export const PageJumperRoot = styled(FlexItem)(({ width }) => ({
  width
}));
