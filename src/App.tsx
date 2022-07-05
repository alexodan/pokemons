import * as React from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import PokemonList, { IPokemon } from './components/PokemonList'
import SearchInput from './components/SearchInput'
import { useNavigate } from 'react-router-dom'
import SortButtons, { SortBy } from './components/SortButtons'
import PaginationButtons from './components/PaginationButtons'

const LIMIT_PER_PAGE = 20

const fetchPokemons = (offset: number) =>
  fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${LIMIT_PER_PAGE}`
  ).then(response => response.json())

function App() {
  const [pokemons, setPokemons] = React.useState<IPokemon[]>([])
  const [offset, setOffset] = React.useState(0)
  const [sortBy, setSortBy] = React.useState<SortBy>('lowest-number')
  const [selectedType, setSelectedType] = React.useState('')

  React.useEffect(() => {
    fetchPokemons(offset).then(data =>
      setPokemons(
        data.results.map((obj: any, i: number) => ({
          ...obj,
          number: i,
        }))
      )
    )
  }, [offset])

  const handleSort = (sort: SortBy) => setSortBy(sort)

  const handlePagination = (page: 'prev' | 'next') => {
    if (page === 'prev' && offset === 0) return
    setOffset(
      page === 'prev' ? offset - LIMIT_PER_PAGE : offset + LIMIT_PER_PAGE
    )
  }

  const handleSearch = (name: string) => {
    setSelectedType('')
    if (name) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => response.json())
        .then(data => setPokemons([data]))
    } else {
      fetchPokemons(offset).then(data =>
        setPokemons(
          data.results.map((obj: any, i: number) => ({
            ...obj,
            number: i,
          }))
        )
      )
    }
  }

  const handleTypeClicked = React.useCallback((type: string, url: string) => {
    setSelectedType(type)
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const { pokemon } = data
        const pokemons: IPokemon[] = pokemon.map(
          ({ pokemon }: { pokemon: IPokemon }, i: number) => ({
            number: i,
            name: pokemon.name,
            url: pokemon.url,
          })
        )
        setPokemons(pokemons)
      })
  }, [])

  const sortedPokemons = pokemons.sort((a, b) => {
    if (sortBy === 'lowest-number') {
      return a.number - b.number
    } else if (sortBy === 'highest-number') {
      return b.number - a.number
    } else if (sortBy === 'a-z') {
      return a.name > b.name ? 1 : -1
    } else if (sortBy === 'z-a') {
      return b.name > a.name ? 1 : -1
    }
    return 1
  })

  return (
    <div className="flex max-w-screen-lg m-auto">
      <div className="hidden h-full md:block">
        <Sidebar
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          onTypeClick={handleTypeClicked}
        />
      </div>
      <div className="w-full">
        <div className="m-4">
          <SearchInput handleSearch={handleSearch} />
        </div>
        <div className="flex m-4 justify-between">
          <SortButtons handleSort={handleSort} />
          <PaginationButtons handlePagination={handlePagination} />
        </div>
        <div className="m-4">
          <PokemonList pokemons={sortedPokemons} />
        </div>
      </div>
    </div>
  )
}

export default App
