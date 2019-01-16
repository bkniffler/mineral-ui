/* @flow */
import styled from '@emotion/styled';
import _Flex from '../../../../../library/Flex';

type Props = {
  gutterWidth?: number | string,
  theme: Object
};

export const containerStyles = ({ theme }: Props) => ({
  outline: `1px dotted ${theme.color_theme_30}`,
  outlineOffset: 4
});

export default styled(_Flex)((props) => containerStyles(props));
