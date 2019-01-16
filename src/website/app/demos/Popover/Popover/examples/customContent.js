/* @flow */

import {
  componentStyleReset,
  createStyledComponent
} from '../../../../../../library/styles';
import Button from '../../../../../../library/Button';
import Popover from '../../../../../../library/Popover';
import Popper from '../../../../../../library/Popover/RtlPopper';
import DemoContent from '../../common/DemoContent';
import renderPropsDescription from '../../../common/renderPropsDescription';

export default {
  id: 'custom-content',
  title: 'Custom Content',
  description: `Use the \`content\` render prop to provide custom rendering
control of the content. ${renderPropsDescription}`,
  scope: {
    Button,
    componentStyleReset,
    createStyledComponent,
    DemoContent,
    Popover,
    Popper
  },
  source: `
    () => {
      const content = ({ props }) => {
        // Your root element must be a Popper component.
        // import { Popper } from 'react-popper';

        const Content = createStyledComponent('div', ({ theme }) => ({
          ...componentStyleReset(theme),

          backgroundColor: theme.backgroundColor_dangerPrimary,
          color: theme.color_white,
          margin: theme.space_inset_sm,
          padding: theme.space_inset_lg,
          zIndex: theme.zIndex_100
        }));

        return (
          <Popper>
            {(popperProps) => {
              const contentProps = {
                ...props,
                ...popperProps
              };

              return (
                <Content {...contentProps} >
                  <DemoContent />
                </Content>
              );
            }}
          </Popper>
        );
      };

      return (
        <Popover content={content}>
          <Button>Open Popover</Button>
        </Popover>
      );
    }`
};
