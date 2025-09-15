interface SearchSectionProps {
  searchedTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
  isSearching?: boolean;
}

export default function SearchSection({ searchedTerm, onSearchChange, onClearSearch, isSearching = false }: SearchSectionProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Search Advocates
      </h2>
      
      <div className="flex gap-3 items-center flex-wrap">
        <div className="relative flex-1 min-w-[300px]">
          <input 
            className={`w-full px-4 py-3 border-2 border-gray-300 rounded-md text-base outline-none transition-colors duration-200 focus:border-blue-600 ${isSearching ? 'pr-10' : 'pr-4'}`}
            onChange={onSearchChange}
            value={searchedTerm}
            placeholder="Search by name, city, degree, or specialty..."
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
        <button 
          onClick={onClearSearch}
          className="bg-gray-600 text-white border-none px-5 py-3 rounded-md cursor-pointer text-sm font-medium whitespace-nowrap hover:bg-gray-700 transition-colors"
        >
          Clear Search
        </button>
      </div>
      
      {searchedTerm && (
        <p className="mt-3 text-sm text-gray-500">
          Searching for: <strong>{searchedTerm}</strong>
        </p>
      )}
    </div>
  );
}
