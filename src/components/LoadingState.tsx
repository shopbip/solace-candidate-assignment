export default function LoadingState() {
  return (
    <div className="text-center py-16 px-5 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
      <div className="text-xl text-gray-600 font-medium">
        Loading advocates...
      </div>
    </div>
  );
}
