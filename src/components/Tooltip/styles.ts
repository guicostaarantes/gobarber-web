import styled, { css } from 'styled-components';

import { CONSTANTS } from '../../styles/constants';

interface ContainerProps {
  color?: string;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  height: 20px;

  span {
    width: 160px;
    background: ${CONSTANTS.primaryColor};
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    color: ${CONSTANTS.grayColor3};

    &::before {
      content: '';
      position: absolute;
      border-style: solid;
      border-color: ${CONSTANTS.primaryColor} transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    visibility: visible;
  }

  ${(props) =>
    props.color &&
    css`
      color: ${props.color};
      span {
        background: ${props.color};

        &::before {
          border-color: ${props.color} transparent;
        }
      }
    `}
`;
