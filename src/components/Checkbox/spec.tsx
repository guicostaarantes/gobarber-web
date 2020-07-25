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

  it('should change when clicking the switch', async () => {
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
    fireEvent.click(input);
    expect(formRef.current?.getData()).toEqual({ newsletter: true });
    fireEvent.click(input);
    expect(formRef.current?.getData()).toEqual({ newsletter: false });
  });

  it('should change when clicking the label', async () => {
    const fn = jest.fn();
    const formRef = React.createRef<FormHandles>();
    const { getByTestId } = render(
      <Form ref={formRef} onSubmit={fn}>
        <Checkbox
          name="newsletter"
          label="I would like to receive news"
          uncheckedLabel="I would NOT like to receive news"
          defaultChecked
        />
      </Form>,
    );
    const label = getByTestId('checkbox-label');
    fireEvent.click(label);
    expect(formRef.current?.getData()).toEqual({ newsletter: false });
    fireEvent.click(label);
    expect(formRef.current?.getData()).toEqual({ newsletter: true });
  });
});
