import styled from 'styled-components';

import { CONSTANTS } from '../../styles/constants';

export const Container = styled.div``;

export const Content = styled.div`
  max-width: 1140px;
  margin: 64px auto;
  padding: 0 20px;
`;

export const ProcedureHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  align-items: baseline;
`;

export const ProcedureTitle = styled.div`
  font-size: 36px;
  margin: 8px;
`;

export const AddProcedureButton = styled.button`
  background: ${CONSTANTS.grayColor4};
  border: 0;
  color: ${CONSTANTS.grayColor6};
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 20px;

  svg {
    color: ${CONSTANTS.primaryColor};
    width: 24px;
    height: 24px;
    margin-right: 4px;
  }
`;

export const ProcedureContent = styled.div`
  background: ${CONSTANTS.grayColor4};
  padding: 20px;
  border-radius: 10px;
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
`;

export const ProcedureInfo = styled.div``;

export const ProcedureName = styled.p`
  font-size: 20px;
  margin-bottom: 10px;
`;

export const ProcedureActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const ProcedureButton = styled.button`
  background: transparent;
  border: 0;

  svg {
    color: ${CONSTANTS.primaryColor};
    width: 24px;
    height: 24px;
    margin-right: 4px;
  }
`;

export const Modal = styled.div`
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: ${CONSTANTS.transparentGrayDarkColor};

  &.modal-open {
    display: block;
  }
`;

export const ModalContent = styled.div`
  max-width: 840px;
  position: relative;
  background-color: ${CONSTANTS.grayColor3};
  margin: 15% auto;
  padding: 20px;
  width: 80%;
  border-radius: 10px;
`;

export const CloseModalButton = styled.button`
  background: transparent;
  border: 0;

  svg {
    width: 20px;
    height: 20px;
    color: ${CONSTANTS.grayColor8};
  }
`;

export const Row = styled.div`
  display: flex;
`;

export const CommentText = styled.div`
  font-size: 16px;
  color: ${CONSTANTS.grayColor7};
  margin: 8px;
`;
