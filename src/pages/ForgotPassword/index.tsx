import React, { useCallback, useRef } from 'react';

import { Link } from 'react-router-dom';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { FiMail, FiArrowLeft } from 'react-icons/fi';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import { useToast } from '../../context/ToastContext';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, ContentBody, Background } from './styles';

import logo from '../../assets/logo.svg';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        formRef.current?.setErrors({}); // eslint-disable-line no-unused-expressions
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Email inválido'),
        });
        await schema.validate(data, { abortEarly: false });
        addToast({
          title: 'Aguarde',
          description: 'Estamos enviando um e-mail pra você.',
        });

        await api.post('users/forgot-password', { email: data.email });

        addToast({
          type: 'success',
          title: 'E-mail enviado',
          description: 'Cheque seu inbox para continuar.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors); // eslint-disable-line no-unused-expressions
        }
        if (err.response?.status === 403) {
          addToast({
            type: 'error',
            title: 'Erro',
            description: 'Não conseguimos enviar o e-mail pra você.',
          });
        }
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <ContentBody>
          <img src={logo} alt="logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>
            <Input name="email" icon={FiMail} placeholder="Email" />
            <Button type="submit">Enviar e-mail de recuperação</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            <span>Voltar para logon</span>
          </Link>
        </ContentBody>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
