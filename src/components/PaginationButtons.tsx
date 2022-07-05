type PaginationButtonsProps = {
  handlePagination: (page: 'prev' | 'next') => void
}

const PaginationButtons = ({ handlePagination }: PaginationButtonsProps) => {
  return (
    <div>
      <button
        className="rounded-sm bg-slate-500 text-white px-2 py-0.5 w-16 mr-2"
        onClick={() => handlePagination('prev')}
      >
        &lt;
      </button>
      <button
        className="rounded-sm bg-slate-500 text-white px-2 py-0.5 w-16"
        onClick={() => handlePagination('next')}
      >
        &gt;
      </button>
    </div>
  )
}

export default PaginationButtons
