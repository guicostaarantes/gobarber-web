import styled from 'styled-components';

import { CONSTANTS } from '../../styles/constants';

export const Container = styled.div`
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 8px;
`;

export const Input = styled.input`
  appearance: none;
  width: 38px;
  height: 21px;
  border-radius: 11px;
  outline: none;
  display: inline-block;
  vertical-align: top;
  position: relative;
  margin: 0;
  cursor: pointer;
  border: 1px solid var(--bc, ${CONSTANTS.grayColor6});
  background: var(--b, ${CONSTANTS.grayColor7});
  transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;

  &:after {
    content: '';
    display: block;
    position: absolute;
    left: 2px;
    top: 2px;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    background: var(--ab, ${CONSTANTS.primaryColor});
    transform: translateX(var(--x, 0));
    transition: transform 0.3s, opacity 0.3s;
  }

  &:checked {
    --b: ${CONSTANTS.primaryDarkerColor};
    --bc: ${CONSTANTS.primaryColor};
    --ab: ${CONSTANTS.primaryColor};
    --x: 17px;

    & + label {
      & .active {
        display: block;
      }
      & .inactive {
        display: none;
      }
    }
  }

  &:disabled {
    --ab: ${CONSTANTS.grayColor5};
    cursor: not-allowed;
    opacity: 0.9;

    & + label {
      cursor: not-allowed;
    }
  }

  &:hover {
    &:not(:checked) {
      &:not(:disabled) {
        --bc: ${CONSTANTS.primaryDarkColor};
      }
    }
  }

  &:focus {
    box-shadow: 0 0 0 ${CONSTANTS.primaryColor};
  }

  & + label {
    color: ${CONSTANTS.grayColor7};
    display: inline-block;
    vertical-align: top;
    cursor: pointer;
    margin-left: 8px;
    & .active {
      display: none;
    }
  }
`;

export const Label = styled.label``;
