import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Checkbox from './index';

describe('Checkbox unit test', () => {
  it('should render correctly', () => {
    const fn = jest.fn();
    const formRef = React.createRef<FormHandles>();
    const { container } = render(
      <Form ref={formRef} onSubmit={fn}>
        <Checkbox
          name="newsletter"
          label="I would like to receive news"
          uncheckedLabel="I would NOT like to receive news"
        />
      </Form>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should change when typing', async () => {
    const fn = jest.fn();
    const formRef = React.createRef<FormHandles>();
    const { getByTestId } = render(
      <Form ref={formRef} onSubmit={fn}>
        <Checkbox
          name="newsletter"
          label="I would like to receive news"
          uncheckedLabel="I would NOT like to receive news"
        />
      </Form>,
    );
    const input = getByTestId('checkbox');
    fireEvent.change(input, { target: { checked: true } });
    expect(formRef.current?.getData()).toEqual({ newsletter: true });
    fireEvent.change(input, { target: { checked: false } });
    expect(formRef.current?.getData()).toEqual({ newsletter: false });
  });
});
