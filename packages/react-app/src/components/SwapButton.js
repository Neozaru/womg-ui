import React, { useEffect, useState } from "react";
import styled from "styled-components";


export const SwapButton = function({onClick}) {

  return (
    <PrimaryButton onClick={onClick} disabled={!amount}>BUTTON</PrimaryButton>
  );
}

const PrimaryButton = styled.button`
  font-size: 20px;
  font-weight: 500;
  padding: 18px;
  margin-top: 20px;
  cursor: pointer;
  color: white;
  background-color: #4967ff;
  font-family: "MessinaMono",monospace;
  outline: none;
  border: 1px solid transparent;
  text-decoration: none;
  &:disabled {
    filter: brightness(50%);
    cursor: default;
  }
`;