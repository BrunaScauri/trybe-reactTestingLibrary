import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes do componente FavoritePokemons', () => {
  test('Testar se a página contém informações sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const noFavorite = screen.getByText('No favorite pokemon found');
    expect(noFavorite).toBeInTheDocument();
  });
  test('Testar se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(
      <App />,
      // <FavoritePokemons />,
      // <PokemonDetails />,
    );
    const homeScreen = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeScreen);
    const details = screen.getByText('More details');
    userEvent.click(details);
    const addFavorite = screen.getByRole('checkbox');
    userEvent.click(addFavorite);
    const favoritesPage = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoritesPage);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
  });
});
