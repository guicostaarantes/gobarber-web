import styled from 'styled-components';

import { CONSTANTS } from '../../styles/constants';

export const Container = styled.div``;

export const Content = styled.div`
  max-width: 1140px;
  margin: 64px auto;
  padding: 0 20px;
  display: flex;
`;

export const Schedule = styled.div`
  flex: 1;
`;

export const ScheduleTitle = styled.div`
  font-size: 36px;
  margin-bottom: 36px;
`;

export const NoAppointmentsMessage = styled.div`
  color: ${CONSTANTS.grayColor6};
  text-align: center;
`;

export const AppointmentContent = styled.div`
  background: ${CONSTANTS.grayColor4};
  display: flex;
  align-items: center;
  padding: 10px 24px;
  border-radius: 10px;
  margin-top: 24px;

  &.next-appointment {
    padding: 16px 24px;
    border: ${CONSTANTS.primaryColor} solid 1px;
    border-radius: 10px;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 0 10px;
  }
`;

export const AppointmentDescription = styled.div`
  margin-left: 24px;
  color: ${CONSTANTS.grayColor9};

  > div {
    font-weight: 500;
  }

  div + div {
    font-weight: 400;
    color: ${CONSTANTS.grayColor6};
    font-size: 14px;
  }
`;

export const AppointmentTime = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    line-height: 16px;

    svg {
      margin-right: 4px;
    }

    & + div {
      margin-top: 6px;
    }
  }
`;
