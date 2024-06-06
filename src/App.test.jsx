import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

window.React = React;

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

test('renders agent', () => {
  render(<App />);
  const agentPrompt = screen.getByText(/What can I help you with?/i);
  expect(agentPrompt).toBeInTheDocument();
});
