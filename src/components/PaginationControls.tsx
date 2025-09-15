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
    <div style={{ 
      marginTop: "24px", 
      display: "flex", 
      justifyContent: "center",
      alignItems: "center",
      gap: "16px",
      padding: "20px",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      border: "1px solid #e9ecef"
    }}>
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ 
          padding: "12px 20px",
          backgroundColor: currentPage === 1 ? "#6c757d" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
          fontSize: "14px",
          fontWeight: "500",
          transition: "background-color 0.2s ease"
        }}
      >
        ← Previous
      </button>
      
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "8px",
        fontSize: "16px",
        color: "#495057",
        fontWeight: "500"
      }}>
        <span>Page</span>
        <span style={{ 
          backgroundColor: "#007bff",
          color: "white",
          padding: "6px 12px",
          borderRadius: "4px",
          minWidth: "40px",
          textAlign: "center"
        }}>
          {currentPage}
        </span>
        <span>of {totalPages}</span>
      </div>
      
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{ 
          padding: "12px 20px",
          backgroundColor: currentPage === totalPages ? "#6c757d" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          fontSize: "14px",
          fontWeight: "500",
          transition: "background-color 0.2s ease"
        }}
      >
        Next →
      </button>
    </div>
  );
}
