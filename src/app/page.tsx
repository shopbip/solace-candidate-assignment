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
      <h1>Solace Advocates</h1>
      <br />
      <br />
      
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
          <div>
            <p>Search</p>
            <p>
              Searching for: <span id="search-term">{searchedTerm}</span>
            </p>
            <input style={{ border: "1px solid black" }} onChange={onChange} />
            <button onClick={onClick}>Reset Search</button>
          </div>
          <br />
          <br />
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
