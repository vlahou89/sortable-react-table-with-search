/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import App from './App';
import React, { Component } from 'react';

describe('App test', () => {
  it('renders table', () => {
    const { getByTestId } = render(<App />);
    const table = getByTestId('table');
    expect(table).toBeTruthy();
  });

  it('renders input', () => {
    const { getByTestId } = render(<App />);
    const input = getByTestId('input');
    expect(input).toBeTruthy();
  });

  it('renders button', () => {
    const { getByTestId } = render(<App />);
    const button = getByTestId('button');
    expect(button).toBeTruthy();
  });
});
