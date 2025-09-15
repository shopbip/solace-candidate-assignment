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
import EmptyState from "../components/EmptyState";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchInput, setSearchInput] = useState<string>(""); // What user is typing
  const [searchedTerm, setSearchedTerm] = useState<string>(""); // What we're actually searching for
  const [isLoading, setIsLoading] = useState<boolean>(false); // No initial loading
  const [isSearching, setIsSearching] = useState<boolean>(false); // For search-specific loading
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hasSearched, setHasSearched] = useState<boolean>(false); // Track if user has searched
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
      setHasSearched(true); // Mark that a search has been performed
      
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

  // No initial fetch - wait for user to search

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
    
    // Only make API call if there's a search term
    if (inputValue.trim()) {
      // Debounce the search to avoid too many API calls
      searchTimeoutRef.current = setTimeout(() => {
        setSearchedTerm(inputValue); // Update the actual search term
        fetchAdvocates(inputValue, 1, true); // Mark as search operation
      }, 300); // 300ms delay
    } else {
      // If input is empty, clear the search term but don't fetch
      setSearchedTerm("");
    }
  };

  const onClick = () => {
    setSearchInput(""); // Clear input immediately
    setSearchedTerm(""); // Clear search term
    setCurrentPage(1);
    // Don't fetch - keep current results when clearing search
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Only fetch if there's a search term
    if (searchedTerm.trim()) {
      fetchAdvocates(searchedTerm, newPage, true);
    }
  };

  return (
    <main className="m-6 font-sans leading-relaxed text-gray-800">
      <Header />
      
      <SearchSection 
        searchedTerm={searchInput}
        onSearchChange={onChange}
        onClearSearch={onClick}
        isSearching={isSearching}
      />
      
      {isLoading && <LoadingState />}
      
      {error && <ErrorState error={error} onRetry={() => {
        if (searchedTerm.trim()) {
          fetchAdvocates(searchedTerm, currentPage, true);
        }
      }} />}
      
      {!hasSearched && !isLoading && !error && <EmptyState />}
      
      {hasSearched && !isLoading && !error && (
        <>
          <ResultsInfo 
            startIndex={(currentPage - 1) * itemsPerPage}
            endIndex={Math.min(currentPage * itemsPerPage, totalCount)}
            totalCount={totalCount}
          />
          
          <div className="relative">
            <AdvocatesTable advocates={advocates} />
            {isSearching && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded-lg">
                <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-lg shadow-lg border border-gray-200">
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm font-medium text-gray-600">
                    Searching...
                  </span>
                </div>
              </div>
            )}
          </div>
          
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