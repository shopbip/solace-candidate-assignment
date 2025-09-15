interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div style={{ 
      backgroundColor: "#f8d7da",
      color: "#721c24",
      padding: "16px",
      borderRadius: "8px",
      border: "1px solid #f5c6cb",
      marginBottom: "24px"
    }}>
      <p style={{ margin: "0 0 12px 0", fontWeight: "500" }}>
        Error: {error}
      </p>
      <button 
        onClick={onRetry}
        style={{
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "500"
        }}
      >
        Retry
      </button>
    </div>
  );
}
