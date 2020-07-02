import styled from 'styled-components';

import { CONSTANTS } from '../../styles/constants';

export const Container = styled.button`
  background: ${CONSTANTS.primaryColor};
  height: 56px;
  border-radius: 10px;
  margin: 8px;
  border: 0;
  padding: 0 16px;
  color: ${CONSTANTS.grayColor3};
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${CONSTANTS.primaryDarkColor};
  }
`;
