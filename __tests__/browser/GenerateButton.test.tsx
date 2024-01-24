/** @jest-environment jsdom */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import GenerateButton from '../../components/GenerateButton';

test('renders the GenerateButton with the correct text and icon', () => {
  render(<GenerateButton />);
  
  const button = screen.getByText('Generate A Proof');
  expect(button).toBeInTheDocument();

  const icon = screen.getByLabelText('Vercel logomark');
  expect(icon).toBeInTheDocument();

});
