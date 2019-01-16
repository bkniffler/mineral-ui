/* @flow */
import styled from '@emotion/styled';
import { pxToEm } from '../../../../../../library/styles';
import Button from '../../../../../../library/Button';
import DemoContent from '../../common/DemoContent';
import Popover from '../../../../../../library/Popover';
import { ThemeProvider } from '../../../../../../library/themes';

const DemoLayout = styled('div')({
  paddingBottom: pxToEm(130)
});

export default {
  id: 'rtl',
  title: 'Bidirectionality',
  description: `Popovers support right-to-left (RTL) languages. The placement of
the content as well as the content itself will be reversed when the
\`direction\` theme variable is set to \`rtl\`.`,
  scope: { Button, DemoContent, DemoLayout, Popover, ThemeProvider },
  source: `
    <DemoLayout dir="rtl">
      <ThemeProvider theme={{ direction: 'rtl' }}>
        <Popover content={<DemoContent />} isOpen placement="bottom-start">
          <Button>Open Popover</Button>
        </Popover>
      </ThemeProvider>
    </DemoLayout>`
};
