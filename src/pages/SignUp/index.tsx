import React from 'react';

import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

import logo from '../../assets/logo.svg';

const SignIn: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={logo} alt="logo" />
      <form>
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
      </form>
      <a href="/">
        <FiArrowLeft />
        <span>Voltar para logon</span>
      </a>
    </Content>
  </Container>
);

export default SignIn;
