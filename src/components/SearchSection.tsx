interface SearchSectionProps {
  searchedTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
  isSearching?: boolean;
}

export default function SearchSection({ searchedTerm, onSearchChange, onClearSearch, isSearching = false }: SearchSectionProps) {
  return (
    <div style={{ 
      backgroundColor: "#f8f9fa",
      padding: "24px",
      borderRadius: "8px",
      border: "1px solid #e9ecef",
      marginBottom: "32px"
    }}>
      <h2 style={{ 
        fontSize: "1.5rem", 
        fontWeight: "600", 
        color: "#2c3e50",
        margin: "0 0 16px 0"
      }}>
        Search Advocates
      </h2>
      
      <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1", minWidth: "300px" }}>
          <input 
            style={{ 
              width: "100%",
              padding: "12px 16px",
              paddingRight: isSearching ? "40px" : "16px",
              border: "2px solid #dee2e6",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none",
              transition: "border-color 0.2s ease"
            }}
            onChange={onSearchChange}
            value={searchedTerm}
            placeholder="Search by name, city, degree, or specialty..."
            onFocus={(e) => e.target.style.borderColor = "#007bff"}
            onBlur={(e) => e.target.style.borderColor = "#dee2e6"}
          />
          {isSearching && (
            <div style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <div style={{
                width: "16px",
                height: "16px",
                border: "2px solid #007bff",
                borderTop: "2px solid transparent",
                borderRadius: "50%",
                animation: "spin 1s linear infinite"
              }} />
            </div>
          )}
        </div>
        <button 
          onClick={onClearSearch}
          style={{
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            whiteSpace: "nowrap"
          }}
        >
          Clear Search
        </button>
      </div>
      
      {searchedTerm && (
        <p style={{ 
          margin: "12px 0 0 0", 
          fontSize: "14px", 
          color: "#6c757d"
        }}>
          Searching for: <strong>{searchedTerm}</strong>
        </p>
      )}
    </div>
  );
}
