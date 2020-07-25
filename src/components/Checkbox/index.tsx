import React, {
  InputHTMLAttributes,
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';

import { useField } from '@unform/core';

import { IconBaseProps } from 'react-icons';

import { Container, Input, Label } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  uncheckedLabel?: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Checkbox: React.FC<InputProps> = ({
  name,
  label,
  uncheckedLabel,
  ...otherProps
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'checked',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <Input
        id={fieldName}
        ref={inputRef}
        type="checkbox"
        data-testid="checkbox"
        {...otherProps}
      />
      <Label htmlFor={fieldName} data-testid="checkbox-label">
        <span className="active">{label}</span>
        <span className="inactive">{uncheckedLabel || label}</span>
      </Label>
    </Container>
  );
};

export default Checkbox;
