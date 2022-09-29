import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const pokemonUrlId = '/pokemons/25';
describe('Testa o componente Pokémon', () => {
  test('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const name = screen.getByTestId('pokemon-name');
    expect(name).toHaveTextContent('Pikachu');
    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent('Electric');
    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
    const pikachuPic = screen.getByRole('img', { name: /sprite/i });
    expect(pikachuPic).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Testa se ao clicar no link é feito o redirecionamento', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toHaveAttribute('href', pokemonUrlId);
    userEvent.click(moreDetails);
    const header = screen.getByRole('heading', { name: /Pikachu details/i });
    expect(header).toBeInTheDocument();
  });

  test('Testa se a URL exibida no navegador muda para pokemon<id>', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    expect(moreDetails).toHaveAttribute('href', pokemonUrlId);
  });

  test('Testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    const addFavorite = screen.getByRole('checkbox');
    userEvent.click(addFavorite);
    const imgFavorite = screen.getByRole('img',
      { name: /Pikachu is marked as favorite/i });
    expect(imgFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
  test('Testa se o card contém um link de navegação para exibir detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toHaveAttribute('href', pokemonUrlId);
  });
});

// test('', () => {
//     const { history } = renderWithRouter(<App />);
//     history.push('/');
//   });
