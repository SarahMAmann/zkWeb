/** @jest-environment jsdom */
import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import NextLogo from '../../components/NextLogo';

test('renders the Next.js logo', () => {
  const { getByLabelText } = render(<NextLogo />);
  const logo = getByLabelText('Next.js logotype');
  // @ts-ignore
  expect(logo).toBeInTheDocument();
});
