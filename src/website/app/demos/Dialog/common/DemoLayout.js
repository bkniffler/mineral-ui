/* @flow */
import styled from '@emotion/styled';

export default styled('div')(({ theme }) => ({
  padding: `${theme.space_inset_md}`,
  position: 'relative',

  '&:not(:last-child)': {
    paddingBottom: 0
  },

  '& > div': {
    position: 'static'
  },

  '& [role="document"]': {
    width: 'auto'
  }
}));
