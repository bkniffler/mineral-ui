/* @flow */
import React from 'react';
import clearFix from 'polished/lib/mixins/clearFix';
import styled from '@emotion/styled';

const Root = styled('div')(({ theme }) => {
  const rtl = theme.direction === 'rtl';

  return {
    ...clearFix(),

    '& > *': {
      marginBottom: '1em',

      '@media(min-width: 40em)': {
        float: rtl ? 'right' : 'left',
        marginLeft: rtl ? '1em' : null,
        marginRight: rtl ? null : '1em',
        width: '47%'
      }
    },

    // http://quantityqueries.com/
    '& > *:nth-last-child(n+3), & > *:nth-last-child(n+3) ~ *': {
      '@media(min-width: 64em)': {
        width: '30%'
      }
    }
  };
});

const DemoLayout = (props: Object) => <Root {...props} />;

export default DemoLayout;
