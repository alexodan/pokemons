import * as React from 'react'
import { TypeColor, typeColors } from '../constants/colors'

type PokemonListItemProps = {
  pokemon: {
    name: string
  }
}

type PokeStatsProps = {
  stats?: { base_stat: string; name: string }[]
}

type PokeCardProps = {
  name: string
  types?: TypeColor[]
  image?: string
}

const PokeCard = ({ name, types, image }: PokeCardProps) => {
  return (
    <div className="w-64 h-48 bg-white rounded-lg border border-gray-200 shadow-md">
      <div className="flex flex-col justify-around items-center">
        <img
          className="mb-3 w-20 h-20 rounded-full shadow-lg"
          src={image}
          alt={`${name} image`}
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 capitalize">
          {name}
        </h5>
        {types && types.length > 0 ? (
          <span className="text-sm text-gray-500 capitalize dark:text-gray-400">
            {`${types?.[0]} pokemon`}
          </span>
        ) : null}
        <div className="flex mt-2 space-x-3">
          {types?.map((type: TypeColor) => (
            <span
              key={type}
              className="capitalize rounded-sm text-white p-0.5"
              style={{ backgroundColor: typeColors[type] }}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const PokeStats = ({ stats }: PokeStatsProps) => {
  return (
    <div className="hidden sm:flex flex-1 flex-col justify-around">
      {stats?.map(stat => (
        <div className="inline-block">
          <span className="text-right capitalize inline-block w-1/3">
            {stat.name.split('-').join(' ')}
          </span>
          <span className="inline-block text-center w-1/3">
            {stat.base_stat}
          </span>
          <span className="inline-block w-1/3">barrita</span>
        </div>
      ))}
    </div>
  )
}

const PokemonListItem = React.memo(({ pokemon }: PokemonListItemProps) => {
  const [details, setDetails] = React.useState<{
    stats: { base_stat: string; name: string }[]
    image: string
    types: string[]
  } | null>(null)

  React.useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      .then(res => res.json())
      .then((data: any) => {
        const image = (data.sprites?.other.home.front_default ||
          data.sprites?.other['official-artwork']?.front_default ||
          data.sprites?.front_default) as string
        const types: string[] = data.types?.map((t: any) => t.type.name) ?? []
        const stats =
          data.stats?.map((stat: any) => ({
            base_stat: stat.base_stat,
            name: stat.stat.name,
          })) ?? []
        setDetails({
          stats,
          image,
          types,
        })
      })
  }, [pokemon.name])

  return (
    <div className="flex justify-center cursor-pointer">
      <div className="mr-4">
        <PokeCard
          name={pokemon.name}
          types={details?.types as TypeColor[]}
          image={details?.image}
        />
      </div>
      <PokeStats stats={details?.stats} />
    </div>
  )
})

export default PokemonListItem
