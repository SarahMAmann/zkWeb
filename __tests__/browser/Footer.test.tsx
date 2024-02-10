/** @jest-environment jsdom */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer';

test('renders the Footer with navigation links and social icons', () => {
  render(<Footer />);
  
  const aboutLink = screen.getByText('About');
  const contributeLink = screen.getByText('Contribute');
  const contactLink = screen.getByText('Contact');

  expect(aboutLink).toBeInTheDocument();
  expect(contributeLink).toBeInTheDocument();
  expect(contactLink).toBeInTheDocument();

});
