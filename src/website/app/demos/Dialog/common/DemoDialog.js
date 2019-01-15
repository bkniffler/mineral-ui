/* @flow */
import withProps from 'recompose/withProps';
import { createStyledComponent } from '../../../../../library/styles';
import Dialog from '../../../../../library/Dialog';

export default withProps({
  closeOnClickOutside: false,
  closeOnEscape: false,
  disableFocusOnOpen: true,
  disableFocusTrap: true,
  isOpen: true,
  preventCloseButtonClose: true,
  usePortal: false
})(
  createStyledComponent(Dialog, {
    position: 'static'
  })
);
