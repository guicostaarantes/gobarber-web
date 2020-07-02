import styled, { css } from 'styled-components';

import { CONSTANTS } from '../../styles/constants';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: ${CONSTANTS.grayColor1};
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 8px;
  color: ${CONSTANTS.grayColor5};
  border: 2px solid ${CONSTANTS.grayColor1};
  transition: color 0.2s, border 0.2s;

  ${(props) =>
    props.isErrored &&
    css`
      border: 2px solid #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: ${CONSTANTS.primaryColor};
      border: 2px solid ${CONSTANTS.primaryColor};
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: ${CONSTANTS.primaryColor};
    `}

  input {
    background: transparent;
    flex: 1;
    border: 0;
    color: ${CONSTANTS.grayColor8};
    &::placeholder {
      color: ${CONSTANTS.grayColor5};
    }
  }

  svg + input {
    margin-left: 16px;
  }

  input + div {
    margin-left: 16px;
  }
`;
