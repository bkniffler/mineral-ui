/* @flow */
import { createStyledComponent } from '../../../../../library/styles';
import Dialog from '../../../../../library/Dialog';

export default createStyledComponent(
  Dialog,
  {
    position: 'static'
  },
  {
    withProps: {
      closeOnClickOutside: false,
      closeOnEscape: false,
      disableFocusOnOpen: true,
      disableFocusTrap: true,
      isOpen: true,
      preventCloseButtonClose: true,
      usePortal: false
    }
  }
);
