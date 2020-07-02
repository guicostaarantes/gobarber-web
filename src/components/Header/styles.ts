import styled from 'styled-components';

import { CONSTANTS } from '../../styles/constants';

export const Container = styled.header`
  padding: 32px 0;
  background: ${CONSTANTS.grayColor2};
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: ${CONSTANTS.grayColor6};
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  strong {
    margin-left: 16px;
    line-height: 24px;
    color: ${CONSTANTS.primaryColor};
  }
`;
