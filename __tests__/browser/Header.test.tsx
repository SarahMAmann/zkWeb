/** @jest-environment jsdom */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '../../components/Header';

test('renders the Header component with the correct content', () => {
  const mockOnGrandparentData = jest.fn();

  render(<Header onGrandparentData={mockOnGrandparentData} />);

  const titleElement = screen.getByText('zkWeb');
  const descriptionElement = screen.getByText('Zero-knowledge proofs for everyone.');

  expect(titleElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
});
