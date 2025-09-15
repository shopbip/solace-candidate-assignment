"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Advocate, AdovacteFetchResponse } from "../types";
import Header from "../components/Header";
import SearchSection from "../components/SearchSection";
import AdvocatesTable from "../components/AdvocatesTable";
import PaginationControls from "../components/PaginationControls";
import ResultsInfo from "../components/ResultsInfo";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchInput, setSearchInput] = useState<string>(""); // What user is typing
  const [searchedTerm, setSearchedTerm] = useState<string>(""); // What we're actually searching for
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSearching, setIsSearching] = useState<boolean>(false); // For search-specific loading
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const itemsPerPage = 10;
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchAdvocates = useCallback(async (searchTerm: string = "", page: number = 1, isSearch: boolean = false) => {
    try {
      if (isSearch) {
        setIsSearching(true);
      } else {
        setIsLoading(true);
      }
      setError(null);
      console.log("fetching advocates...");
      
      // Build query parameters
      const params = new URLSearchParams();
      if (searchTerm.trim()) {
        params.append('search', searchTerm.trim());
      }
      params.append('page', page.toString());
      params.append('limit', itemsPerPage.toString());
      params.append('sort', 'firstName');
      params.append('order', 'asc');
      
      const response = await fetch(`/api/advocates?${params.toString()}`);
      
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
      
      // Update pagination metadata if available
      if (jsonResponse.pagination) {
        setTotalCount(jsonResponse.pagination.totalCount);
        setTotalPages(jsonResponse.pagination.totalPages);
        setCurrentPage(jsonResponse.pagination.page);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Error fetching advocates:", errorMessage);
      setError(errorMessage);
      setAdvocates([]);
    } finally {
      if (isSearch) {
        setIsSearching(false);
      } else {
        setIsLoading(false);
      }
    }
  }, [itemsPerPage]);

  useEffect(() => {
    fetchAdvocates();
  }, [fetchAdvocates]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue); // Update input immediately (no re-render of SearchSection)
    setCurrentPage(1); // Reset to first page when searching
    
    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Debounce the search to avoid too many API calls
    searchTimeoutRef.current = setTimeout(() => {
      setSearchedTerm(inputValue); // Update the actual search term
      fetchAdvocates(inputValue, 1, true); // Mark as search operation
    }, 300); // 300ms delay
  };

  const onClick = () => {
    setSearchInput(""); // Clear input immediately
    setSearchedTerm(""); // Clear search term
    setCurrentPage(1);
    fetchAdvocates("", 1, true);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchAdvocates(searchedTerm, newPage, true);
  };

  return (
    <main style={{ 
      margin: "24px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      lineHeight: "1.6",
      color: "#333"
    }}>
      <Header />
      
      {isLoading && <LoadingState />}
      
      {error && <ErrorState error={error} onRetry={() => fetchAdvocates()} />}
      
      {!isLoading && !error && (
        <>
          <SearchSection 
            searchedTerm={searchInput}
            onSearchChange={onChange}
            onClearSearch={onClick}
            isSearching={isSearching}
          />
          
          <ResultsInfo 
            startIndex={(currentPage - 1) * itemsPerPage}
            endIndex={Math.min(currentPage * itemsPerPage, totalCount)}
            totalCount={totalCount}
          />
          
          <AdvocatesTable advocates={advocates} />
          
          <PaginationControls 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </main>
  );
}