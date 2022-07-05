import * as React from 'react'

export default function usePokemon({ pokemonName = '' }) {
  const [pokemon, setPokemon] = React.useState(null)

  React.useEffect(() => {
    let ignore = false
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(res => res.json())
      .then(data => {
        if (!ignore) {
          setPokemon(data)
        }
      })
    return () => {
      ignore = true
    }
  }, [pokemonName])

  return pokemon
}
