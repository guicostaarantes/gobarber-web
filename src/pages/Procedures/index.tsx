import React, { useState, useEffect, useCallback } from 'react';

import { FiPlus, FiEdit, FiTrash } from 'react-icons/fi';

import api from '../../services/api';

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
} from './styles';

import Header from '../../components/Header';

interface Procedure {
  id: string;
  name: string;
  duration: number;
  price: number;
}

const Procedures: React.FC = () => {
  const [procedures, setProcedures] = useState<Procedure[]>([]);

  useEffect(() => {
    (async () => {
      const response = await api.get<Procedure[]>(`suppliers/me/procedures`);
      setProcedures(response.data);
    })();
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
        <ProcedureHeader>
          <ProcedureTitle>Meus procedimentos</ProcedureTitle>
          <AddProcedureButton type="button">
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
              <ProcedureButton type="button">
                <FiEdit />
              </ProcedureButton>
              <ProcedureButton type="button">
                <FiTrash />
              </ProcedureButton>
            </ProcedureActions>
          </ProcedureContent>
        ))}
      </Content>
    </Container>
  );
};

export default Procedures;
