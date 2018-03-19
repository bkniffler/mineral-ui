/* @flow */
import React from 'react';
import { shallow } from 'enzyme';
import Avatar from 'library/Avatar';
import examples from 'website/app/demos/Avatar/examples';
import testDemoExamples from 'utils/testDemoExamples';

function shallowAvatar(props) {
  return shallow(<Avatar {...props}>A</Avatar>);
}

describe('Avatar', () => {
  it('renders', () => {
    const avatar = shallowAvatar({});

    expect(avatar.exists()).toEqual(true);
  });

  testDemoExamples(examples);
});