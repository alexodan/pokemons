import * as React from 'react'

type IType = {
  name: string
  url: string
}

type Props = {
  onTypeClick: (type: string, url: string) => void
  selectedType: string
  setSelectedType: (type: string) => void
}

const Sidebar = ({ onTypeClick, selectedType, setSelectedType }: Props) => {
  const [types, setTypes] = React.useState<IType[]>([])

  const handleClick = (typeName: string, typeUrl: string) => {
    onTypeClick(typeName, typeUrl)
  }

  React.useEffect(() => {
    fetch('https://pokeapi.co/api/v2/type')
      .then(res => res.json())
      .then(({ results }: { results: IType[] }) => setTypes(results))
  }, [])

  return (
    <aside className="w-48" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3 bg-gray-50">
        <ul className="space-y-2">
          {types.map((type, index) => {
            return (
              <li key={index} onClick={() => handleClick(type.name, type.url)}>
                <button
                  className={`${
                    type.name === selectedType
                      ? 'bg-red-800 text-white'
                      : 'bg-gray-100 text-gray-600'
                  } cursor-pointer block font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-gray-500 mr-2 mb-2 w-full`}
                >
                  <span className="ml-3 uppercase">{type.name}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
