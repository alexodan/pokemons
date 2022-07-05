type SortButtonProps = {
  handleSort: (sort: SortBy) => void
}

export type SortBy = 'lowest-number' | 'highest-number' | 'a-z' | 'z-a'

const SortButtons = ({ handleSort }: SortButtonProps) => {
  return (
    <div>
      <button
        className="w-16 mr-2 rounded bg-cyan-500 px-1 text-white"
        type="button"
        onClick={() => handleSort('lowest-number')}
      >
        1...N
      </button>
      <button
        className="w-16 mr-2 rounded bg-cyan-500 px-1 text-white"
        type="button"
        onClick={() => handleSort('highest-number')}
      >
        N...1
      </button>
      <button
        className="w-16 mr-2 rounded bg-cyan-500 px-1 text-white"
        type="button"
        onClick={() => handleSort('a-z')}
      >
        A...Z
      </button>
      <button
        className="w-16 mr-2 rounded bg-cyan-500 px-1 text-white"
        type="button"
        onClick={() => handleSort('z-a')}
      >
        Z...A
      </button>
    </div>
  )
}

export default SortButtons
