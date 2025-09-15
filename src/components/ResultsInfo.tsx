interface ResultsInfoProps {
  startIndex: number;
  endIndex: number;
  totalCount: number;
}

export default function ResultsInfo({ startIndex, endIndex, totalCount }: ResultsInfoProps) {
  return (
    <div style={{ 
      marginBottom: "20px",
      padding: "16px",
      backgroundColor: "#e3f2fd",
      borderRadius: "6px",
      border: "1px solid #bbdefb"
    }}>
      <p style={{ 
        margin: "0", 
        fontSize: "16px", 
        color: "#1565c0",
        fontWeight: "500"
      }}>
        Showing {startIndex + 1} to {Math.min(endIndex, totalCount)} of {totalCount} advocates
      </p>
    </div>
  );
}
