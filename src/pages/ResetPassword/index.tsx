import React, { useCallback, useRef } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { FiArrowLeft, FiLock } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import qs from 'query-string';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import { useToast } from '../../context/ToastContext';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, ContentBody, Background } from './styles';

import logo from '../../assets/logo.svg';

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({}); // eslint-disable-line no-unused-expressions
        const schema = Yup.object().shape({
          token: Yup.string().required(),
          password: Yup.string().min(8, 'Mínimo de 8 dígitos'),
          confirmPassword: Yup.string()
            .required('Senha obrigatória')
            .oneOf([Yup.ref('password')], 'Confirmação incorreta'),
        });

        const { token } = qs.parse(location.search);

        await schema.validate({ ...data, token }, { abortEarly: false });

        await api.patch('users/forgot-password', {
          token,
          newPassword: data.password,
        });

        addToast({
          type: 'success',
          title: 'Senha redefinida',
          description:
            'Utilize suas novas credenciais para acessar a aplicação.',
        });

        history.push('/signin');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors); // eslint-disable-line no-unused-expressions
        } else {
          addToast({
            type: 'error',
            title: 'Erro na requisição',
            description: 'Não foi possível redefinir sua senha nesse momento.',
          });
          history.push('/signin');
        }
      }
    },
    [addToast, history, location.search],
  );

  return (
    <Container>
      <Background />
      <Content>
        <ContentBody>
          <img src={logo} alt="logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Redefinir senha</h1>
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova Senha"
            />
            <Input
              name="confirmPassword"
              icon={FiLock}
              type="password"
              placeholder="Confirmar nova senha"
            />
            <Button type="submit">Redefinir senha</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            <span>Voltar para logon</span>
          </Link>
        </ContentBody>
      </Content>
    </Container>
  );
};

export default ResetPassword;
