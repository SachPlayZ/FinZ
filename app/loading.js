"use client"

import React from 'react';
import { css } from '@emotion/react';
import { PulseLoader } from 'react-spinners';

// Define the CSS for the spinner
const override = css`
  display: block;
  margin: 0 auto;
  border-color: neonorange;
`;

const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <PulseLoader color="#FF7300" loading={true} css={override} size={15} />
    </div>
  );
};

export default Loading;
