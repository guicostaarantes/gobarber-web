import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './index';

describe('Button unit test', () => {
  it('should render correctly', () => {
    const { container } = render(<Button>Label</Button>);
    expect(container).toMatchSnapshot();
    // expect(container).toBe('Label');
  });

  it('should call onClick when clicked', () => {
    const fn = jest.fn();
    const { getByTestId } = render(<Button onClick={fn} />);
    const button = getByTestId('button');
    fireEvent.click(button);
    expect(fn).toBeCalledTimes(1);
    fireEvent.click(button);
    expect(fn).toBeCalledTimes(2);
  });
});
