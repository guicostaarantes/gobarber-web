import React, { useMemo } from 'react';

import { FiPower } from 'react-icons/fi';

import * as Styled from './styles';

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
    <Styled.Container>
      <Styled.Content>
        <Styled.Logo src={logo} alt="logo" />
        <Styled.Middle>
          <Styled.Profile>
            <Styled.UserPicture src={avatarSrc} alt="avatar" />
            <Styled.UserName>{user && user.fullName}</Styled.UserName>
          </Styled.Profile>
          <Styled.Menu>
            <Styled.MenuItem to="/">Agendamentos</Styled.MenuItem>
            <Styled.MenuItem to="/vacancies">Disponibilidade</Styled.MenuItem>
            <Styled.MenuItem to="/procedures">Procedimentos</Styled.MenuItem>
          </Styled.Menu>
        </Styled.Middle>
        <Styled.SignOutButton type="button" onClick={signOut}>
          <FiPower />
        </Styled.SignOutButton>
      </Styled.Content>
    </Styled.Container>
  );
};

export default Header;
