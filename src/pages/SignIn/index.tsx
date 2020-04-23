import React, { useCallback, useRef } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import { useUser } from '../../context/UserContext';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

import logo from '../../assets/logo.svg';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useUser();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({}); // eslint-disable-line no-unused-expressions
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Email inválido'),
          password: Yup.string().required('Senha obrigatória'),
        });
        await schema.validate(data, { abortEarly: false });
        signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors); // eslint-disable-line no-unused-expressions
      }
    },
    [signIn],
  );

  return (
    <Container>
      <Content>
        <img src={logo} alt="logo" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
          <Input name="email" icon={FiMail} placeholder="Email" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Entrar</Button>
          <a href="forgot">Esqueci minha senha</a>
        </Form>
        <a href="newAccount">
          <FiLogIn />
          <span>Criar conta</span>
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
