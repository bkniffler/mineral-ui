/* @flow */
import React from 'react';
import styled from '@emotion/styled';

const Form = styled('form')({
  '& > *:not(:last-child)': {
    marginBottom: '1rem'
  }
});

export default function DemoForm(props: Object) {
  const formProps = {
    onSubmit: (event) => event.preventDefault(),
    ...props
  };

  return <Form {...formProps} />;
}
