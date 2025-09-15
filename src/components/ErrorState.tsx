interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="bg-red-100 text-red-800 p-4 rounded-lg border border-red-200 mb-6">
      <p className="m-0 mb-3 font-medium">
        Error: {error}
      </p>
      <button 
        onClick={onRetry}
        className="bg-red-600 text-white border-none px-4 py-2 rounded cursor-pointer text-sm font-medium hover:bg-red-700 transition-colors"
      >
        Retry
      </button>
    </div>
  );
}
