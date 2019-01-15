/* @flow */
import React from 'react';
import { shallow } from 'enzyme';
import TextInput from '../TextInput';
import examples from '../../../website/app/demos/TextInput/TextInput/examples';
import testDemoExamples from '../../../../utils/testDemoExamples';
import { getSerializedHTML, mountInThemeProvider } from '../../../../utils/enzymeUtils';

function shallowTextInput(props = {}) {
  const textInputProps = {
    ...props
  };
  return shallow(<TextInput {...textInputProps} />);
}

function mountTextInput(props = {}) {
  const textInputProps = {
    ...props
  };
  return mountInThemeProvider(<TextInput {...textInputProps} />);
}

describe('TextInput', () => {
  testDemoExamples(examples, {
    exclude: ['states', 'types']
  });

  it('renders', () => {
    const textInput = shallowTextInput();

    expect(textInput.exists()).toEqual(true);
  });

  it('renders an html size attribute when provided', () => {
    const [, textInput] = mountTextInput({
      htmlSize: 1
    });

    expect(getSerializedHTML(textInput)).toMatchSnapshot();
  });
});
