import React, { useState } from 'react';
import SearchBar from '../components/search/SearchBar';
import FilterPanel from '../components/search/FilterPanel';
import AssetCard from '../components/display/AssetCard';
import Pagination from '../components/display/Pagination';
import EmptyState from '../components/shared/EmptyState';
import './SearchPage.css';

/**
 * SearchPage Component
 * Display search results with filtering and pagination
 * 
 * @component
 * @example
 * <SearchPage query="API" onAssetClick={(id) => {}} />
 */
const SearchPage = ({
  query = '',
  results = [],
  onSearchChange = () => {},
  onAssetClick = () => {},
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    categories: [],
    statuses: [],
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(results.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const pageResults = results.slice(startIdx, endIdx);

  const suggestions = [
    'API Design Standard',
    'Database Naming Playbook',
    'Microservices Best Practice',
    'Security Runbook',
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="search-page">
      {/* Search Bar */}
      <div className="search-page__header">
        <SearchBar
          placeholder="Search knowledge..."
          onSearch={onSearchChange}
          suggestions={suggestions}
        />
      </div>

      {/* Results Section */}
      <div className="search-page__content">
        {/* Sidebar Filters */}
        <aside className="search-page__sidebar">
          <FilterPanel
            onFilterChange={(newFilters) => {
              setFilters(newFilters);
              setCurrentPage(1);
            }}
          />
        </aside>

        {/* Results Grid */}
        <main className="search-page__main">
          {/* Results Info */}
          {results.length > 0 && (
            <div className="search-page__info">
              <h2>
                Search Results for "{query}"
              </h2>
              <p className="search-page__count">
                Found {results.length} result{results.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}

          {/* Results */}
          {pageResults.length > 0 ? (
            <>
              <div className="search-page__results">
                {pageResults.map((asset) => (
                  <AssetCard
                    key={asset.id}
                    {...asset}
                    onClick={onAssetClick}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <EmptyState
              title="No results found"
              description={
                query
                  ? `No knowledge assets match "${query}". Try a different search term.`
                  : 'Start searching to discover knowledge assets.'
              }
              icon="🔍"
              action={{
                label: 'Browse all',
                onClick: () => onSearchChange(''),
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchPage;
