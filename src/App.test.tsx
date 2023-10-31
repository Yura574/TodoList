import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
export const testFanc = (a: number, b: number)=> {
  return a+b
}

test('test', ()=> {
  const endState = testFanc(5,3)
  expect(endState).toBe(8)
})
