import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { CONSTANTS } from '../../styles/constants';

export const Container = styled.header`
  padding: 20px 0;
  background: ${CONSTANTS.grayColor2};
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
`;

export const Logo = styled.img`
  height: 80px;
`;

export const Middle = styled.div`
  margin-left: 80px;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  strong {
  }
`;

export const UserPicture = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
`;

export const UserName = styled.strong`
  margin-left: 16px;
  line-height: 24px;
  color: ${CONSTANTS.primaryColor};
`;

export const Menu = styled.div`
  display: flex;
`;

export const MenuItem = styled(Link)`
  color: ${CONSTANTS.primaryColor};
  padding: 10px;
  text-decoration: none;
  :not(:first-child) {
    ::before {
      content: 'a';
    }
  }
`;

export const SignOutButton = styled.button`
  margin-left: auto;
  background: transparent;
  border: 0;

  svg {
    color: ${CONSTANTS.grayColor7};
    width: 20px;
    height: 20px;
  }
`;
