/** @jest-environment jsdom */
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Loading from '../../components/Loading';

test('renders the PacmanLoader component with the correct color', () => {
  const { getByTestId } = render(<Loading />);
  const loader = getByTestId('pacman-loader');
  
  expect(loader).toBeInTheDocument();
});
