import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import { useToast } from '../../context/ToastContext';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, ContentBody, Background } from './styles';

import logo from '../../assets/logo.svg';

interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({}); // eslint-disable-line no-unused-expressions
        const schema = Yup.object().shape({
          fullName: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Email inválido'),
          password: Yup.string().min(8, 'Mínimo de 8 dígitos'),
          confirmPassword: Yup.string()
            .required('Senha obrigatória')
            .oneOf([Yup.ref('password')], 'Confirmação incorreta'),
        });
        await schema.validate(data, { abortEarly: false });

        const newUserData = { ...data };
        delete newUserData.confirmPassword;
        await api.post('users', newUserData);

        addToast({
          type: 'success',
          title: 'Usuário criado',
          description: 'Utilize suas credenciais para acessar a aplicação.',
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
            description: 'Não foi possível criar o seu usuário nesse momento.',
          });
        }
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <ContentBody>
          <img src={logo} alt="logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Input name="fullName" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="Email" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Input
              name="confirmPassword"
              icon={FiLock}
              type="password"
              placeholder="Confirmar senha"
            />
            <Button type="submit">Cadastrar</Button>
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

export default SignUp;
