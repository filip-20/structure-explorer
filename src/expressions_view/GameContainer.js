import React from 'react';
import styled from 'styled-components';

const Container = styled.div.attrs({
  className: `d-flex flex-column
              position-relative
              w-100
              m-0 p-3
              border`
  })`
  max-height: 95vh;
  height: 500px;
`;

export default Container;
