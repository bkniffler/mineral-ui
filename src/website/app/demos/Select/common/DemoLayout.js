/* @flow */
import styled from '@emotion/styled';

export default styled('div')({
  '&[class] > *:not(:last-child)': {
    marginBottom: '1rem'
  }
});
