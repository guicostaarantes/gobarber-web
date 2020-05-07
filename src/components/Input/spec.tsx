import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Input from './index';

describe('Input unit test', () => {
  it('should render correctly', () => {
    const fn = jest.fn();
    const formRef = React.createRef<FormHandles>();
    const { container } = render(
      <Form ref={formRef} onSubmit={fn}>
        <Input name="email" />
      </Form>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should change when typing', async () => {
    const fn = jest.fn();
    const formRef = React.createRef<FormHandles>();
    const { getByTestId } = render(
      <Form ref={formRef} onSubmit={fn}>
        <Input name="email" />
      </Form>,
    );
    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: 'test@test.com' } });
    expect(formRef.current?.getData()).toEqual({ email: 'test@test.com' });
  });
});
