import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.div`
  max-width: 1140px;
  margin: 64px auto;
  padding: 0 20px;
`;

export const ProcedureHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 36px;
  align-items: baseline;
`;

export const ProcedureTitle = styled.div`
  font-size: 36px;
`;

export const AddProcedureButton = styled.button`
  background: #3e3b47;
  border: 0;
  color: #999591;
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 20px;

  svg {
    color: #ff9000;
    width: 24px;
    height: 24px;
    margin-right: 4px;
  }
`;

export const ProcedureContent = styled.div`
  background: #3e3b47;
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
    color: #ff9000;
    width: 24px;
    height: 24px;
    margin-right: 4px;
  }
`;
