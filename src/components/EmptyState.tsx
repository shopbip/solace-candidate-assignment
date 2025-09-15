export default function EmptyState() {
  return (
    <div className="text-center py-20 px-5 bg-gray-50 rounded-lg border border-gray-200 mt-8">
      <div className="text-5xl mb-4 text-gray-500">
        🔍
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        Start Your Search
      </h2>
      <p className="text-base text-gray-500 mb-6 max-w-md mx-auto">
        Enter a search term above to find qualified health professionals. 
        You can search by name, city, degree, or specialty.
      </p>
      <div className="flex flex-wrap gap-2 justify-center mt-6">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          Name
        </span>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          City
        </span>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          Degree
        </span>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          Specialty
        </span>
      </div>
    </div>
  );
}
