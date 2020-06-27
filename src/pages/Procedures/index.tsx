import React, { useState, useEffect, useCallback, useRef } from 'react';

import classNames from 'classnames';

import {
  FiPlus,
  FiEdit,
  FiTrash,
  FiXCircle,
  FiMessageCircle,
  FiClock,
  FiDollarSign,
} from 'react-icons/fi';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import { useToast } from '../../context/ToastContext';

import {
  Container,
  Content,
  ProcedureHeader,
  ProcedureTitle,
  AddProcedureButton,
  ProcedureContent,
  ProcedureInfo,
  ProcedureName,
  ProcedureActions,
  ProcedureButton,
  Modal,
  ModalContent,
  CloseModalButton,
  CommentText,
} from './styles';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import NotFound from '../NotFound';

import { useUser } from '../../context/UserContext';

interface Procedure {
  id: string;
  name: string;
  duration: number;
  price: number;
}

interface AddOrEditModalFormData {
  name: string;
  duration: number;
  price: number;
}

const Procedures: React.FC = () => {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [editingProcedureId, setEditingProcedureId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { supplier } = useUser();
  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);

  const handleOpenProcedureModal = useCallback(
    (id) => {
      setEditingProcedureId(id);
      setIsModalOpen(true);
      const procedure = procedures.find((proc) => proc.id === id);
      // eslint-disable-next-line no-unused-expressions
      formRef?.current?.setData({
        name: procedure?.name || '',
        duration: procedure?.duration || '',
        price: procedure?.price || '',
      });
    },
    [procedures],
  );

  const handleCloseProcedureModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleSubmitProcedure = useCallback(
    async (data: AddOrEditModalFormData) => {
      try {
        formRef.current?.setErrors({}); // eslint-disable-line no-unused-expressions
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          duration: Yup.string()
            .required('Duração obrigatória')
            .matches(/^[0-9,]+$/, 'Duração deve ser um número'),
          price: Yup.string()
            .required('Preço obrigatório')
            .matches(/^[0-9,]+$/, 'Preço deve ser um número'),
        });
        await schema.validate(data, { abortEarly: false });
        if (editingProcedureId === '') {
          await api.post('procedures', data);
        } else {
          await api.patch(`procedures/${editingProcedureId}`, data);
        }
        addToast({
          type: 'success',
          title: 'Sucesso',
          description:
            editingProcedureId === ''
              ? 'Procedimento adcionando.'
              : 'Procedimento editado.',
        });
        setIsModalOpen(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors); // eslint-disable-line no-unused-expressions
        }
        if (err.response?.status) {
          addToast({
            type: 'error',
            title: 'Erro',
            description:
              'Ocorreu um erro ao enviar sua requisição ao servidor.',
          });
        }
      }
    },
    [addToast, editingProcedureId],
  );

  const getProcedures = useCallback(async () => {
    const response = await api.get<Procedure[]>(`suppliers/me/procedures`);
    setProcedures(response.data);
  }, []);

  useEffect(() => {
    getProcedures();
  }, [getProcedures]);

  const formatCurrency = useCallback(
    (price: number): string =>
      Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price),
    [],
  );

  if (!supplier) {
    return <NotFound />;
  }

  return (
    <Container>
      <Header />
      <Content>
        <ProcedureHeader>
          <ProcedureTitle>Meus procedimentos</ProcedureTitle>
          <AddProcedureButton
            type="button"
            onClick={() => handleOpenProcedureModal('')}
          >
            <FiPlus />
            Adicionar novo procedimento
          </AddProcedureButton>
        </ProcedureHeader>
        {procedures.map((procedure) => (
          <ProcedureContent key={procedure.id}>
            <ProcedureInfo>
              <ProcedureName>{procedure.name}</ProcedureName>
              <p>{`Duração: ${procedure.duration} minutos`}</p>
              <p>{`Preço: ${formatCurrency(procedure.price)}`}</p>
            </ProcedureInfo>
            <ProcedureActions>
              <ProcedureButton
                type="button"
                onClick={() => handleOpenProcedureModal(procedure.id)}
              >
                <FiEdit />
              </ProcedureButton>
              <ProcedureButton type="button">
                <FiTrash />
              </ProcedureButton>
            </ProcedureActions>
          </ProcedureContent>
        ))}
      </Content>
      <Modal className={classNames({ 'modal-open': isModalOpen })}>
        <ModalContent>
          <ProcedureHeader>
            <ProcedureTitle>
              {editingProcedureId === ''
                ? 'Adicionar novo procedimento'
                : 'Editar procedimento'}
            </ProcedureTitle>
            <CloseModalButton onClick={handleCloseProcedureModal}>
              <FiXCircle />
            </CloseModalButton>
          </ProcedureHeader>
          <Form ref={formRef} onSubmit={handleSubmitProcedure}>
            <Input
              name="name"
              icon={FiMessageCircle}
              placeholder="Nome do procedimento"
            />
            <Input
              name="duration"
              icon={FiClock}
              placeholder="Duração (minutos)"
            />
            <Input
              name="price"
              icon={FiDollarSign}
              placeholder="Preço (reais)"
            />
            {editingProcedureId !== '' && (
              <CommentText>
                Obs: agendamentos que foram feitos antes da edição permanecem
                com os dados do momento em que o cliente confirmou o
                agendamento.
              </CommentText>
            )}
            <Button type="submit">Finalizar</Button>
          </Form>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Procedures;
