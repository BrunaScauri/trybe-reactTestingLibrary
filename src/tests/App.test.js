import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste se o header contém um conjunto fixo de links de navegação.', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toBeDefined();
  });
  test('O segundo link deve possuir o texto About', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const about = screen.getByRole('link', { name: 'About' });
    expect(about).toBeDefined();
  });
  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const poke = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(poke).toBeDefined();
  });

  test('Testa redirecionamento para Home', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkHome = screen.getByRole('link', { name: /Home/ });
    expect(linkHome).toBeInTheDocument();
    userEvent.click(linkHome);
    const titleHome = screen.getByRole('heading',
      { level: 2, name: /Encountered Pokémons/i });
    expect(titleHome).toBeInTheDocument();
  });
  test('Testa redirecionamento para About', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const titleHome = screen.getByRole('heading',
      { level: 2, name: /Encountered Pokémons/i });
    expect(titleHome).toBeInTheDocument();
    const linkAbout = screen.getByRole('link', { name: /About/ });
    userEvent.click(linkAbout);
    const titleAbout = screen.getByRole('heading',
      { level: 2, name: /About Pokédex/i });
    expect(titleAbout).toBeInTheDocument();
  });
  test('Testa redirecionamento para Pokemons Favoritos', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const titleHome = screen.getByRole('heading',
      { level: 2, name: /Encountered Pokémons/i });
    expect(titleHome).toBeInTheDocument();
    const linkFavPoke = screen.getByRole('link', { name: /Favorite Pokémons/ });
    userEvent.click(linkFavPoke);
    const titleFavPoke = screen.getByRole('heading',
      { level: 2, name: /Favorite Pokémons/i });
    expect(titleFavPoke).toBeInTheDocument();
  });
  test('Teste se a aplicação é redirecionada para a página Not Found',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/page-not-found');

      const linkNotFound = screen.getByRole('heading',
        { name: /page requested not found/i, level: 2 });
      expect(linkNotFound).toBeInTheDocument();
    });
});
