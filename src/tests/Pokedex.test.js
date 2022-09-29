import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o componente Pokédex', () => {
  test('Testa se a página contem um heading com o texto Encountered Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const heading = screen.getByText(/Encountered pokémons/i);
    expect(heading).toBeInTheDocument();
  });
  test('Teste se é exibido o próximo Pokémon da lista', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const firstPokemon = screen.getByRole('img');
    expect(firstPokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemonButton); // charmander
    userEvent.click(nextPokemonButton); // caterpie
    userEvent.click(nextPokemonButton); // ekans
    userEvent.click(nextPokemonButton); // alakazam
    userEvent.click(nextPokemonButton); // mew
    userEvent.click(nextPokemonButton); // rapidash
    userEvent.click(nextPokemonButton); // snorlax
    userEvent.click(nextPokemonButton); // dragonair
    const lastPokemon = screen.getByRole('img');
    expect(lastPokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png');
  });
  test('Teste se é mostrado apenas um pokémon por vez', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const detailsLink = screen.getAllByRole('link', { name: /more details/i });
    expect(detailsLink.length).toBe(1);
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const quantity = 7;
    const buttonFilter = screen.getAllByTestId('pokemon-type-button');
    expect(buttonFilter.length).toBe(quantity);
    const electric = screen.getByRole('button', { name: /electric/i });
    expect(electric).toBeDefined();
    const fire = screen.getByRole('button', { name: /fire/i });
    expect(fire).toBeDefined();
    const bug = screen.getByRole('button', { name: /bug/i });
    expect(bug).toBeDefined();
    const poison = screen.getByRole('button', { name: /poison/i });
    expect(poison).toBeDefined();
    const psychic = screen.getByRole('button', { name: /psychic/i });
    expect(psychic).toBeDefined();
    const normal = screen.getByRole('button', { name: /normal/i });
    expect(normal).toBeDefined();
    const dragon = screen.getByRole('button', { name: /dragon/i });
    expect(dragon).toBeDefined();

    userEvent.click(fire);
    const charmander = screen.getAllByRole('img', { src: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png' });
    expect(charmander).toBeDefined();

    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toBeDefined();
    userEvent.click(buttonAll);
    const pikachu = screen.getByRole('img');
    expect(pikachu).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});
