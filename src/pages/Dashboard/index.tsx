import React, { useState, useEffect, useCallback } from 'react';

import { FiClock, FiCalendar } from 'react-icons/fi';

import { addDays, isToday, isTomorrow, format } from 'date-fns';

import classnames from 'classnames';

import api from '../../services/api';

import {
  Container,
  Content,
  Schedule,
  ScheduleTitle,
  NoAppointmentsMessage,
  AppointmentContent,
  AppointmentDescription,
  AppointmentTime,
} from './styles';

import Header from '../../components/Header';

import avatar from '../../assets/avatar.svg';

interface Appointment {
  id: string;
  price: number;
  startDate: Date;
  endDate: Date;
  __customer__: {
    fullName: string;
  };
  __procedure__: {
    name: string;
  };
}

const Dashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    (async () => {
      const response = await api.get<Appointment[]>(
        `suppliers/me/appointments`,
        {
          params: { startDate: new Date(), endDate: addDays(new Date(), 30) },
        },
      );
      setAppointments(response.data);
    })();
  }, []);

  const formatDate = useCallback((date: Date): string => {
    if (isToday(date)) return 'Hoje';
    if (isTomorrow(date)) return 'Amanhã';
    return format(date, 'dd/MM/yyyy');
  }, []);

  const formatTime = useCallback((date: Date): string => {
    return format(date, 'HH:mm');
  }, []);

  const formatCurrency = useCallback(
    (price: number): string =>
      Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price),
    [],
  );

  return (
    <Container>
      <Header />
      <Content>
        <Schedule>
          <ScheduleTitle>Próximos agendamentos</ScheduleTitle>
          {!appointments.length && (
            <NoAppointmentsMessage>
              <span>Ainda não há agendamentos futuros.</span>
            </NoAppointmentsMessage>
          )}
          {appointments.map((appointment, index) => (
            <AppointmentContent
              key={appointment.id}
              className={classnames({ 'next-appointment': index === 0 })}
            >
              <img src={avatar} alt="avatar" />
              <AppointmentDescription>
                <div>{appointment.__customer__.fullName}</div>
                <div>
                  <span>{appointment.__procedure__.name}</span>
                  <span> - </span>
                  <span>{formatCurrency(appointment.price)}</span>
                </div>
              </AppointmentDescription>
              <AppointmentTime>
                <div>
                  <FiCalendar />
                  <span>{formatDate(new Date(appointment.startDate))}</span>
                </div>
                <div>
                  <FiClock />
                  <span>
                    <span>{formatTime(new Date(appointment.startDate))}</span>
                    <span>-</span>
                    <span>{formatTime(new Date(appointment.endDate))}</span>
                  </span>
                </div>
              </AppointmentTime>
            </AppointmentContent>
          ))}
        </Schedule>
      </Content>
    </Container>
  );
};

export default Dashboard;
