import React from 'react';

import { Container } from './styles';

import { useUser } from '../../context/UserContext';

const Dashboard: React.FC = () => {
  const { user, signOut } = useUser();

  return (
    <Container>
      <h1>{user?.fullName}</h1>
      <button type="button" onClick={() => signOut()}>
        Sign Out
      </button>
    </Container>
  );
};

export default Dashboard;
