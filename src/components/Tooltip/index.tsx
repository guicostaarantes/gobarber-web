import React from 'react';

import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface TooltipProps {
  icon: React.ComponentType<IconBaseProps>;
  text: string;
  color?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ icon: Icon, text, color }) => {
  return (
    <Container color={color}>
      <Icon size={20} />
      <span>{text}</span>
    </Container>
  );
};

export default Tooltip;
