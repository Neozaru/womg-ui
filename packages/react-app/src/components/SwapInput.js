
import React from "react";
import styled from "styled-components";

export const SwapInput = function({title, symbol, balance, displayMaxButton, value, onValueChanged}) {

  return (
    <Container>
      <InputHeader>
        <span>{title}</span>
        <span>Balance: {balance}</span>
      </InputHeader>
      <InputBody>
        <Amount key={title} 
          title="Token Amount" 
          type="text" 
          inputmode="decimal" 
          autocomplete="off" 
          autocorrect="off" 
          pattern="^[0-9]*[.,]?[0-9]*$" 
          size="18" 
          placeholder="0.0" 
          value={value} 
          onChange={(e) => e.target.validity.valid && onValueChanged(e.target.value)}/>
        <Unit>
          {displayMaxButton && <MaxButton onClick={() => onValueChanged(balance)}>MAX</MaxButton>}
          <Symbol>{symbol}</Symbol>
        </Unit>
      </InputBody>
    </Container>
  );
};

const Container = styled.div`
  color: blue;
  display: flex;
  flex-direction: column;
  background-color: #35353f;
  font-family: "MessinaMono",monospace;
`

const InputHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 500;
  line-height: 1rem;
  padding: 0.75rem 0.75rem 0px;
  color: #b3b3bf;
`

const InputBody = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  transition: all .2s ease-in-out;
  background-color: #35353f
  border: 2px solid #585868;
  transition: all .2s ease-in-out;
`

const Amount = styled.input`
  border: none;
  outline: none;
  font-size: 24px;
  color: white;
  background-color: #35353f;
  font-family: inherit;
  width: 100%;
`

const Unit = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const Symbol = styled.div`
  color: white;
  margin-top: 2px;
`

const MaxButton = styled.button`
  border-radius: 20px;
  border: 1px solid rgb(42, 41, 46) ;
  color: #35353f;
  background-color: rgb(42, 41, 46);
  color: white;
  transition: all 200ms ease-in-out 0s;
  margin-right: 5px;
  cursor: pointer;
  outline: none;
  box-shadow: none;
  font-size: 12px;
  :hover {
    border: 1px solid #b3b3bf;
  }
`
