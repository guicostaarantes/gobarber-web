import React from 'react';

import { FiPower } from 'react-icons/fi';

import { Container, Profile } from './styles';

import { useUser } from '../../context/UserContext';

import logo from '../../assets/logo.svg';
import avatar from '../../assets/avatar.svg';

const Header: React.FC = () => {
  const { user, signOut } = useUser();

  return (
    <Container>
      <img src={logo} alt="logo" />
      <Profile>
        <img
          src={
            user && user.avatar
              ? `${process.env.REACT_APP_STATIC_BASE_URL}/${user.avatar}`
              : avatar
          }
          alt="avatar"
        />
        <strong>{user && user.fullName}</strong>
      </Profile>
      <button type="button" onClick={signOut}>
        <FiPower />
      </button>
    </Container>
  );
};

export default Header;
