interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export default function PaginationControls({ currentPage, totalPages, onPageChange }: PaginationControlsProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-6 flex justify-center items-center gap-4 p-5 bg-gray-50 rounded-lg border border-gray-200">
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-5 py-3 text-white border-none rounded-md text-sm font-medium transition-colors ${
          currentPage === 1 
            ? 'bg-gray-500 cursor-not-allowed' 
            : 'bg-blue-600 cursor-pointer hover:bg-blue-700'
        }`}
      >
        ← Previous
      </button>
      
      <div className="flex items-center gap-2 text-base text-gray-600 font-medium">
        <span>Page</span>
        <span className="bg-blue-600 text-white px-3 py-1.5 rounded min-w-[40px] text-center">
          {currentPage}
        </span>
        <span>of {totalPages}</span>
      </div>
      
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-5 py-3 text-white border-none rounded-md text-sm font-medium transition-colors ${
          currentPage === totalPages 
            ? 'bg-gray-500 cursor-not-allowed' 
            : 'bg-blue-600 cursor-pointer hover:bg-blue-700'
        }`}
      >
        Next →
      </button>
    </div>
  );
}
