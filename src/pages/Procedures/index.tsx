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
  Row,
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
  const [deletingProcedureId, setDeletingProcedureId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { supplier } = useUser();
  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);

  const getProcedures = useCallback(async () => {
    const response = await api.get<Procedure[]>(`suppliers/me/procedures`);
    setProcedures(response.data);
  }, []);

  useEffect(() => {
    getProcedures();
  }, [getProcedures]);

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
    formRef.current?.setErrors({}); // eslint-disable-line no-unused-expressions
    setIsModalOpen(false);
  }, []);

  const handleOpenDeleteProcedureModal = useCallback((id) => {
    setDeletingProcedureId(id);
    setIsDeleteModalOpen(true);
  }, []);

  const handleCloseDeleteProcedureModal = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  const handleDeleteProcedure = useCallback(async () => {
    try {
      await api.delete(`procedures/${deletingProcedureId}`);
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Procedimento excluído.',
      });
      setIsDeleteModalOpen(false);
      getProcedures();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro',
        description: 'Ocorreu um erro ao enviar sua requisição ao servidor.',
      });
    }
  }, [getProcedures, addToast, deletingProcedureId]);

  const handleSubmitProcedure = useCallback(
    async (data: AddOrEditModalFormData) => {
      try {
        formRef.current?.setErrors({}); // eslint-disable-line no-unused-expressions
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          duration: Yup.string().required('Duração obrigatória'),
          price: Yup.string().required('Preço obrigatório'),
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
        getProcedures();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors); // eslint-disable-line no-unused-expressions
        } else if (err.response?.status === 409) {
          // eslint-disable-next-line no-unused-expressions
          formRef.current?.setErrors({
            name: 'Já existe um procedimento com este nome.',
          });
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
    [editingProcedureId, addToast, getProcedures],
  );

  const handleDurationFieldChange = useCallback((event) => {
    const value = event.target.value as string;
    const formattedValue = value.match(/[0-9]+/)?.[0] || '';
    // eslint-disable-next-line no-unused-expressions
    formRef?.current?.setData({
      duration: formattedValue,
    });
  }, []);

  const handlePriceFieldChange = useCallback((event) => {
    const value = event.target.value as string;
    const sanitizedValue = value.replace(',', '.');
    const formattedValue =
      sanitizedValue.match(/[0-9]+\.?[0-9]{0,2}/)?.[0] || '';
    // eslint-disable-next-line no-unused-expressions
    formRef?.current?.setData({
      price: formattedValue,
    });
  }, []);

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
              <ProcedureButton
                type="button"
                onClick={() => handleOpenDeleteProcedureModal(procedure.id)}
              >
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
            <Row>
              <Input
                name="name"
                icon={FiMessageCircle}
                placeholder="Nome do procedimento"
              />
            </Row>
            <Row>
              <Input
                name="duration"
                icon={FiClock}
                placeholder="Duração (minutos)"
                onChange={handleDurationFieldChange}
              />
              <Input
                name="price"
                icon={FiDollarSign}
                placeholder="Preço (reais)"
                onChange={handlePriceFieldChange}
              />
            </Row>
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
      <Modal className={classNames({ 'modal-open': isDeleteModalOpen })}>
        <ModalContent>
          <ProcedureHeader>
            <ProcedureTitle>Excluir procedimento</ProcedureTitle>
            <CloseModalButton onClick={handleCloseDeleteProcedureModal}>
              <FiXCircle />
            </CloseModalButton>
          </ProcedureHeader>
          <CommentText>
            Ao excluir um procedimento, usuários não poderão mais ver e agendar
            este procedimento.
          </CommentText>
          <CommentText>
            Usuários que já agendaram esse procedimento continuarão com esse
            agendamento. Portanto, é necessário cumprir com esse agendamento, ou
            então desmarcá-los manualmente.
          </CommentText>
          <CommentText>Confirma a exclusão do procedimento?</CommentText>
          <Row>
            <Button type="button" onClick={handleDeleteProcedure}>
              Excluir procedimento
            </Button>
            <Button type="button" onClick={handleCloseDeleteProcedureModal}>
              Não excluir
            </Button>
          </Row>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Procedures;
