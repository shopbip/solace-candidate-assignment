"use client";

import { useEffect, useState, useCallback } from "react";
import { Advocate, AdovacteFetchResponse } from "../types";



export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchedTerm, setSearchedTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdvocates = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("fetching advocates...");
      
      const response = await fetch("/api/advocates");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const jsonResponse: AdovacteFetchResponse = await response.json();
      
      if (jsonResponse.error) {
        throw new Error(jsonResponse.error);
      }
      
      if (!jsonResponse.data || !Array.isArray(jsonResponse.data)) {
        throw new Error("Invalid data format received from server");
      }
      
      setAdvocates(jsonResponse.data);
      setFilteredAdvocates(jsonResponse.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Error fetching advocates:", errorMessage);
      setError(errorMessage);
      setAdvocates([]);
      setFilteredAdvocates([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdvocates();
  }, [fetchAdvocates]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    const searchTermLower = searchTerm.toLowerCase();

    setSearchedTerm(searchTerm);

    console.log("filtering advocates...");

    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTermLower) ||
        advocate.lastName.toLowerCase().includes(searchTermLower) ||
        advocate.city.toLowerCase().includes(searchTermLower) ||
        advocate.degree.toLowerCase().includes(searchTermLower) ||
        advocate.specialties.find((specialty) => specialty.toLowerCase().includes(searchTermLower)) ||
        advocate.yearsOfExperience.toString().toLowerCase().includes(searchTermLower)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
    setSearchedTerm("");
  };

  return (
    <main style={{ margin: "24px" }}>
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
          margin: "0 0 8px 0"
        }}>
          Solace Advocates
        </h1>
        <p style={{ 
          fontSize: "1.1rem", 
          color: "#6c757d", 
          margin: "0"
        }}>
          Find qualified health professionals
        </p>
      </header>
      
      {isLoading && (
        <div>
          <p>Loading advocates...</p>
        </div>
      )}
      
      {error && (
        <div style={{ color: "red", marginBottom: "16px" }}>
          <p>Error: {error}</p>
          <button onClick={fetchAdvocates}>Retry</button>
        </div>
      )}
      
      {!isLoading && !error && (
        <>
          {/* Search Section */}
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
              <input 
                style={{ 
                  flex: "1",
                  minWidth: "300px",
                  padding: "12px 16px",
                  border: "2px solid #dee2e6",
                  borderRadius: "6px",
                  fontSize: "16px",
                  outline: "none",
                  transition: "border-color 0.2s ease"
                }}
                onChange={onChange}
                value={searchedTerm}
                placeholder="Search by name, city, degree, or specialty..."
                onFocus={(e) => e.target.style.borderColor = "#007bff"}
                onBlur={(e) => e.target.style.borderColor = "#dee2e6"}
              />
              <button 
                onClick={onClick}
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
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>City</th>
                <th>Degree</th>
                <th>Specialties</th>
                <th>Years of Experience</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdvocates.map((advocate) => {
                return (
                  <tr key={advocate.id}>
                    <td>{advocate.firstName}</td>
                    <td>{advocate.lastName}</td>
                    <td>{advocate.city}</td>
                    <td>{advocate.degree}</td>
                    <td>
                      {advocate.specialties.map((s, index) => (
                        <div key={index}>{s}</div>
                      ))}
                    </td>
                    <td>{advocate.yearsOfExperience}</td>
                    <td>{advocate.phoneNumber}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </main>
  );
}
