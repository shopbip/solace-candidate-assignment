export default function LoadingState() {
  return (
    <div style={{ 
      textAlign: "center", 
      padding: "60px 20px",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      border: "1px solid #e9ecef"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        marginBottom: "16px"
      }}>
        <div style={{
          width: "24px",
          height: "24px",
          border: "3px solid #007bff",
          borderTop: "3px solid transparent",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }} />
      </div>
      <div style={{ 
        fontSize: "1.2rem", 
        color: "#495057",
        fontWeight: "500"
      }}>
        Loading advocates...
      </div>
    </div>
  );
}
