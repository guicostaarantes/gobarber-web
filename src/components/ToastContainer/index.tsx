import React from 'react';
import { useTransition } from 'react-spring';

import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';

import { Container, Toast } from './styles';

import { ToastMsg, useToast } from '../../context/ToastContext';

const icons = {
  default: <FiInfo size={22} />,
  success: <FiCheckCircle size={22} />,
  error: <FiAlertCircle size={22} />,
};

const ToastContainer: React.FC<{ toasts: ToastMsg[] }> = ({ toasts }) => {
  const { removeToast } = useToast();

  const animatedToasts = useTransition(toasts, (toast) => toast.id, {
    from: { right: '-120%' },
    enter: { right: '0%' },
    leave: { right: '-120%' },
  });

  return (
    <Container>
      {animatedToasts.map(({ item, key, props }) => (
        <Toast key={key} style={props} type={item.type}>
          {icons[item.type || 'default']}
          <div>
            <strong>{item.title}</strong>
            {item.description && <p>{item.description}</p>}
          </div>
          <button type="button" onClick={() => removeToast(item.id)}>
            <FiXCircle />
          </button>
        </Toast>
      ))}
    </Container>
  );
};

export default ToastContainer;
