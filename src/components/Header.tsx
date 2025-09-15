export default function Header() {
  return (
    <header style={{ 
      textAlign: "center", 
      marginBottom: "40px",
      paddingBottom: "20px",
      borderBottom: "2px solid #e1e5e9"
    }}>
      <h1 style={{ 
        fontSize: "2.5rem", 
        fontWeight: "700", 
        color: "#2c3e50",
        margin: "0 0 8px 0",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
      }}>
        Solace Advocates
      </h1>
      <p style={{ 
        fontSize: "1.1rem", 
        color: "#6c757d", 
        margin: "0",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
      }}>
        Find qualified health professionals
      </p>
    </header>
  );
}
