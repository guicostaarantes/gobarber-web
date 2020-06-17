import React, { useMemo } from 'react';

import { FiPower } from 'react-icons/fi';

import { Container, Content, Profile } from './styles';

import { useUser } from '../../context/UserContext';

import logo from '../../assets/logo.svg';
import avatar from '../../assets/avatar.svg';

const Header: React.FC = () => {
  const { user, signOut } = useUser();

  const avatarSrc = useMemo(() => {
    if (user && user.avatar) {
      return `${process.env.REACT_APP_STATIC_BASE_URL}/${user.avatar}`;
    }
    return avatar;
  }, [user]);

  return (
    <Container>
      <Content>
        <img src={logo} alt="logo" />
        <Profile>
          <img src={avatarSrc} alt="avatar" />
          <strong>{user && user.fullName}</strong>
        </Profile>
        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </Content>
    </Container>
  );
};

export default Header;
