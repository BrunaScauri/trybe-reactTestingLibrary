import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente NotFound', () => {
  test('Testa se a página contém um heading com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/page-not-found');
    const text = screen.getByText('Page requested not found');
    expect(text).toBeInTheDocument();
  });
  test('Testa se a página mostra a imagem selecionada', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/page-not-found');
    const pnfImage = screen.getByRole('img', { name: /pikachu crying/i });
    const pnfImageSource = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(pnfImage).toBeInTheDocument();
    expect(pnfImage).toHaveAttribute('src', pnfImageSource);
  });
});
