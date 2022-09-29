import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o componente About', () => {
  test('Testa se a página contém informações sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const titleAbout = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(titleAbout).toBeInTheDocument();
  });
  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const titleAbout2 = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(titleAbout2).toBeInTheDocument();
  });
  test('Testa se a aplicação contém dois parágrafos com textos sobre a pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const firstParagraph = screen.getByText(/this application/i);
    const secondParagraph = screen.getByText(/One can filter/i);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  test('Testa se a página contém a imagem de uma pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const imageLink = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imagePokedex = screen.getByRole('img', { name: /pokédex/i });
    expect(imagePokedex).toHaveAttribute('src', imageLink);
    expect(imagePokedex).toBeInTheDocument();
  });
});
