interface ResultsInfoProps {
  startIndex: number;
  endIndex: number;
  totalCount: number;
}

export default function ResultsInfo({ startIndex, endIndex, totalCount }: ResultsInfoProps) {
  return (
    <div className="mb-5 p-4 bg-blue-50 rounded-md border border-blue-200">
      <p className="m-0 text-base text-blue-700 font-medium">
        Showing {startIndex + 1} to {Math.min(endIndex, totalCount)} of {totalCount} advocates
      </p>
    </div>
  );
}
