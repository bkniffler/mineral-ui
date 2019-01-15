/* @flow */
import React from 'react';
import { mount } from 'enzyme';
import { createStyledComponent } from '../../styles';

const mountButton = (props = {}, styles = {}, options = {}) => {
  const Button = createStyledComponent('button', styles, options);
  return mount(<Button {...props} />);
};

describe('createStyledComponent', () => {
  describe('styles', () => {
    const styleObject = { color: 'red' };
    const styleArray = [{ color: 'red' }, { backgroundColor: 'blue' }];
    const styleObjectFunction = () => styleObject;
    const styleArrayFunction = () => styleArray;

    it('supports style objects', () => {
      const wrapper = mountButton({}, styleObject);

      expect(wrapper).toHaveStyleRule('color', 'red');
    });

    it('supports style arrays', () => {
      const wrapper = mountButton({}, styleArray);

      expect(wrapper).toHaveStyleRule('color', 'red');
      expect(wrapper).toHaveStyleRule('background-color', 'blue');
    });

    it('supports style functions that return objects', () => {
      const wrapper = mountButton({}, styleObjectFunction);

      expect(wrapper).toHaveStyleRule('color', 'red');
    });

    it('supports style functions that return arrays', () => {
      const wrapper = mountButton({}, styleArrayFunction);

      expect(wrapper).toHaveStyleRule('color', 'red');
      expect(wrapper).toHaveStyleRule('background-color', 'blue');
    });
  });
});
