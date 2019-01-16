/* @flow */
import React from 'react';
import styled from '@emotion/styled';
import withProps from 'recompose/withProps';
import { componentStyleReset } from '../../../../../../library/styles';
import _Link from '../../../../../../library/Link';
import _DemoLayout from '../../../common/DemoLayout';

const DemoLayout = withProps({ marginRight: '1em' })(
  styled(_DemoLayout)(({ theme }) => componentStyleReset(theme))
);

const Link = (props: {}) => <_Link target="_blank" {...props} />;

export default {
  id: 'variants',
  title: 'Variants',
  description: 'Style Links with these variants to help communicate purpose.',
  scope: { DemoLayout, Link },
  source: `
    <DemoLayout>
      <Link href="http://example.com">Default</Link>
      <Link variant="danger" href="http://example.com">Danger</Link>
      <Link variant="success" href="http://example.com">Success</Link>
      <Link variant="warning" href="http://example.com">Warning</Link>
    </DemoLayout>`
};
