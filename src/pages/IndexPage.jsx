import React, { useState } from 'react';
import MainNav from '../components/navigation/MainNav';
import AssetCard from '../components/display/AssetCard';
import Pagination from '../components/display/Pagination';
import LoadingState from '../components/shared/LoadingState';
import EmptyState from '../components/shared/EmptyState';
import './IndexPage.css';

/**
 * IndexPage Component
 * Browse all knowledge assets organized by category
 * 
 * @component
 * @example
 * <IndexPage onAssetClick={(id) => {}} />
 */
const IndexPage = ({
  assets = [],
  loading = false,
  onAssetClick = () => {},
}) => {
  const [activeCategory, setActiveCategory] = useState('standards');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;

  // Comprehensive default assets covering all categories in MainNav
  const defaultAssets = [
    {
      id: '1',
      title: 'API Design Standard',
      category: 'Standards',
      status: 'approved',
      summary: 'Guidelines for designing RESTful APIs.',
      owner: 'Platform Team',
      lastUpdated: new Date(),
    },
    {
      id: '2',
      title: 'Database Naming Playbook',
      category: 'Playbooks',
      status: 'approved',
      summary: 'Best practices for naming databases.',
      owner: 'Data Team',
      lastUpdated: new Date(),
    },
    {
      id: '3',
      title: 'Microservices Best Practice',
      category: 'Best Practices',
      status: 'approved',
      summary: 'Patterns for microservices architecture.',
      owner: 'Architecture Team',
      lastUpdated: new Date(),
    },
    {
      id: '4',
      title: 'Deployment & Failover Procedure',
      category: 'Runbooks',
      status: 'approved',
      summary: 'Step-by-step guidelines for executing production deployment rollbacks.',
      owner: 'DevOps Team',
      lastUpdated: new Date(),
    },
    {
      id: '5',
      title: 'Post-Mortem: Database Failover',
      category: 'Lessons Learned',
      status: 'approved',
      summary: 'Key key takeaways and findings from the Q2 database incident.',
      owner: 'SRE Team',
      lastUpdated: new Date(),
    },
    {
      id: '6',
      title: 'ADR 001: Event-Driven Architecture',
      category: 'ADRs',
      status: 'approved',
      summary: 'Architectural Decision Record outlining Kafka implementation.',
      owner: 'Architecture Team',
      lastUpdated: new Date(),
    },
    {
      id: '7',
      title: 'Domain Terminology & Glossary',
      category: 'Glossary',
      status: 'approved',
      summary: 'Standardized terms and definitions used across engineering teams.',
      owner: 'Core Team',
      lastUpdated: new Date(),
    },
    {
      id: '8',
      title: 'System Architecture Documentation',
      category: 'Documentation',
      status: 'approved',
      summary: 'Overview of system design, network topologies, and data flows.',
      owner: 'Platform Team',
      lastUpdated: new Date(),
    },
  ];

  const displayAssets = assets.length > 0 ? assets : defaultAssets;

  // Map matching exact IDs from MainNav.jsx
  const categoryMap = {
    standards: 'Standards',
    practices: 'Best Practices',
    playbooks: 'Playbooks',
    runbooks: 'Runbooks',
    lessons: 'Lessons Learned',
    adrs: 'ADRs',
    glossary: 'Glossary',
    docs: 'Documentation',
  };

  const currentCategoryLabel =
    categoryMap[activeCategory] ||
    activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);

  const filteredAssets = displayAssets.filter(
    (asset) =>
      asset.category &&
      asset.category.trim().toLowerCase() === currentCategoryLabel.trim().toLowerCase()
  );

  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const pageAssets = filteredAssets.slice(startIdx, endIdx);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="index-page">
      {/* Navigation */}
      <MainNav
        active={activeCategory}
        onNavigate={handleCategoryChange}
      />

      {/* Content */}
      <div className="index-page__container">
        <header className="index-page__header">
          <h1>Browse Knowledge Assets</h1>
          <p className="index-page__subtitle">
            {currentCategoryLabel} ({filteredAssets.length})
          </p>
        </header>

        {/* Loading State */}
        {loading ? (
          <LoadingState type="skeleton" count={6} />
        ) : pageAssets.length > 0 ? (
          <>
            {/* Assets Grid */}
            <div className="index-page__grid">
              {pageAssets.map((asset) => (
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
            title="No assets in this category"
            description={`There are no ${currentCategoryLabel.toLowerCase()} available yet.`}
            icon="📭"
            action={{
              label: 'Browse another category',
              onClick: () => handleCategoryChange('standards'),
            }}
          />
        )}
      </div>
    </div>
  );
};

export default IndexPage;