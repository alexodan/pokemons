import * as React from 'react'
import PokemonListItem from './PokemonListItem'

export type IPokemon = {
  number: number
  name: string
  url: string
}

type Props = {
  pokemons: IPokemon[]
}
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/620.svg
// https://pokeapi.co/api/v2/pokemon/ditto
// https://pokeapi.co/api/v2/pokemon/132
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png
const PokemonList = ({ pokemons }: Props) => {
  return (
    <ul>
      {pokemons.map((pokemon, index) => (
        <div
          key={pokemon.name}
          className={`p-4 ${
            index % 2 == 0 ? 'bg-gray-200' : 'border-gray-100'
          }`}
        >
          <PokemonListItem pokemon={pokemon} />
        </div>
      ))}
    </ul>
  )
}

export default PokemonList
