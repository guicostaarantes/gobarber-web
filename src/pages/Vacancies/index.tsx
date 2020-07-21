import React, { useState, useEffect, useCallback, useRef } from 'react';

import { startOfToday, addDays } from 'date-fns';

import classNames from 'classnames';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { FiPlus, FiXCircle, FiClock } from 'react-icons/fi';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import NotFound from '../NotFound';

import { useUser } from '../../context/UserContext';
import { useToast } from '../../context/ToastContext';

import {
  Container,
  Content,
  VacancyHeader,
  VacancyTitle,
  AddVacancyButton,
  VacancyContent,
  VacancyInfo,
  VacancyName,
  VacancyActions,
  VacancyButton,
  Modal,
  ModalContent,
  CloseModalButton,
  Row,
  CommentText,
} from './styles';
import Checkbox from '../../components/Checkbox';

interface Vacancy {
  id: string;
  startDate: Date;
  endDate: Date;
}

interface AddOrDeleteVacancyFormData {
  adding: boolean;
  startDate: Date;
  endDate: Date;
}

const Vacancies: React.FC = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [startDate, setStartDate] = useState(startOfToday());
  const [endDate, setEndDate] = useState(addDays(startOfToday(), 7));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { supplier } = useUser();
  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);

  const getVacancies = useCallback(async () => {
    const response = await api.get<Vacancy[]>(`suppliers/me/vacancies`, {
      params: { startDate, endDate },
    });
    setVacancies(response.data);
  }, [startDate, endDate]);

  useEffect(() => {
    getVacancies();
  }, [getVacancies]);

  const handleOpenVacancyModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseVacancyModal = useCallback(() => {
    formRef.current?.setErrors({}); // eslint-disable-line no-unused-expressions
    setIsModalOpen(false);
  }, []);

  const handleSubmitVacancy = useCallback(
    async (data: AddOrDeleteVacancyFormData) => {
      try {
        formRef.current?.setErrors({}); // eslint-disable-line no-unused-expressions
        const schema = Yup.object().shape({
          adding: Yup.boolean().required(),
          startDate: Yup.date().required(),
          endDate: Yup.date().required(),
        });
        await schema.validate(data, { abortEarly: false });

        if (data.adding) {
          await api.post('vacancies', {
            startDate: data.startDate,
            endDate: data.endDate,
          });
        } else {
          await api.delete('vacancies', {
            data: {
              startDate: data.startDate,
              endDate: data.endDate,
            },
          });
        }
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: data.adding ? 'Agenda adicionada.' : 'Agenda removida.',
        });
        setIsModalOpen(false);
        getVacancies();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors); // eslint-disable-line no-unused-expressions
        } else {
          addToast({
            type: 'error',
            title: 'Erro',
            description:
              'Ocorreu um erro ao enviar sua requisição ao servidor.',
          });
        }
      }
    },
    [addToast, getVacancies],
  );

  const handleStartDateFieldChange = useCallback((event) => {
    const value = event.target.value as string;
    // eslint-disable-next-line no-unused-expressions
    formRef?.current?.setData({
      startDate: value,
    });
  }, []);

  const handleEndDateFieldChange = useCallback((event) => {
    const value = event.target.value as string;
    // eslint-disable-next-line no-unused-expressions
    formRef?.current?.setData({
      endDate: value,
    });
  }, []);

  if (!supplier) {
    return <NotFound />;
  }

  return (
    <Container>
      <Header />
      <Content>
        <VacancyHeader>
          <VacancyTitle>Minha disponibilidade</VacancyTitle>
          <AddVacancyButton type="button" onClick={handleOpenVacancyModal}>
            <FiPlus />
            Adicionar ou remover agenda
          </AddVacancyButton>
        </VacancyHeader>
        {vacancies.map((vacancy) => (
          <VacancyContent key={vacancy.id}>
            <VacancyInfo>
              <p>{`De: ${vacancy.startDate}`}</p>
              <p>{`Até: ${vacancy.endDate}`}</p>
            </VacancyInfo>
          </VacancyContent>
        ))}
      </Content>
      <Modal className={classNames({ 'modal-open': isModalOpen })}>
        <ModalContent>
          <VacancyHeader>
            <VacancyTitle>Adicionar ou remover agenda</VacancyTitle>
            <CloseModalButton onClick={handleCloseVacancyModal}>
              <FiXCircle />
            </CloseModalButton>
          </VacancyHeader>
          <Form ref={formRef} onSubmit={handleSubmitVacancy}>
            <Row>
              <Checkbox
                name="adding"
                label="Adicionar horário"
                uncheckedLabel="Remover horário"
              />
            </Row>
            <Row>
              <Input
                name="startDate"
                icon={FiClock}
                placeholder="Data/hora de início"
                onChange={handleStartDateFieldChange}
              />
            </Row>
            <Row>
              <Input
                name="endDate"
                icon={FiClock}
                placeholder="Data/hora de fim"
                onChange={handleEndDateFieldChange}
              />
            </Row>
            <Row>
              <Button type="submit">Finalizar</Button>
            </Row>
          </Form>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Vacancies;
