import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 30px;
  overflow: hidden;
`;

interface ToastProps {
  type?: 'success' | 'error';
}

const toastTypes = {
  default: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  success: css`
    background: #e6ffe6;
    color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
};

export const Toast = styled.div<ToastProps>`
  width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;
  margin-bottom: 12px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;

  ${(props) => toastTypes[props.type || 'default']}

  > svg {
    margin-right: 12px;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    top: 6px;
    right: 6px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }
`;
