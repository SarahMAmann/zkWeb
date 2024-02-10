/** @jest-environment jsdom */
import Navbar from '@/components/NavBar';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

test('renders the Navbar with links', () => {
  render(<Navbar />);
  
  const generateButton = screen.getByText('Generate A Proof');
  const contributeLink = screen.getByText('Contribute');

  expect(generateButton).toBeInTheDocument();
  expect(contributeLink).toBeInTheDocument();
});
