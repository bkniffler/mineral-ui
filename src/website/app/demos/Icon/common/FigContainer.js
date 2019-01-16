/* @flow */
import {
  componentStyleReset,
  createStyledComponent
} from '../../../../../library/styles';

export default createStyledComponent('div', ({ theme }) => ({
  ...componentStyleReset(theme),

  display: 'flex',
  flexWrap: 'wrap',
  marginLeft: `-${theme.space_inline_xs}`
}));
