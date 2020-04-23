import React from 'react';

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
  return (
    <Container>
      {toasts.map((toast: ToastMsg) => (
        <Toast key={toast.id} type={toast.type}>
          {icons[toast.type || 'default']}
          <div>
            <strong>{toast.title}</strong>
            {toast.description && <p>{toast.description}</p>}
          </div>
          <button type="button" onClick={() => removeToast(toast.id)}>
            <FiXCircle />
          </button>
        </Toast>
      ))}
    </Container>
  );
};

export default ToastContainer;
