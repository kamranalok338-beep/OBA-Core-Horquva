import React, { useState } from 'react';
import AppShell from './components/layout/AppShell';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import IndexPage from './pages/IndexPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('index');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAssetId, setSelectedAssetId] = useState(null);

  // Complete mock search results covering all 8 knowledge categories
  const mockSearchResults = [
    {
      id: '1',
      title: 'API Design Standard',
      category: 'Standards',
      status: 'approved',
      summary: 'Guidelines for designing RESTful APIs.',
      owner: 'Platform Team',
      lastUpdated: '2026-08-01',
    },
    {
      id: '2',
      title: 'Database Naming Playbook',
      category: 'Playbooks',
      status: 'approved',
      summary: 'Best practices for naming databases.',
      owner: 'Data Team',
      lastUpdated: '2026-08-05',
    },
    {
      id: '3',
      title: 'Microservices Best Practice',
      category: 'Best Practices',
      status: 'approved',
      summary: 'Patterns for microservices architecture.',
      owner: 'Architecture Team',
      lastUpdated: '2026-08-10',
    },
    {
      id: '4',
      title: 'Deployment & Failover Procedure',
      category: 'Runbooks',
      status: 'approved',
      summary: 'Step-by-step guidelines for executing production deployment rollbacks.',
      owner: 'DevOps Team',
      lastUpdated: '2026-08-12',
    },
    {
      id: '5',
      title: 'Post-Mortem: Database Failover',
      category: 'Lessons Learned',
      status: 'approved',
      summary: 'Key takeaways and findings from the Q2 database incident.',
      owner: 'SRE Team',
      lastUpdated: '2026-08-15',
    },
    {
      id: '6',
      title: 'ADR 001: Event-Driven Architecture',
      category: 'ADRs',
      status: 'approved',
      summary: 'Architectural Decision Record outlining Kafka implementation.',
      owner: 'Architecture Team',
      lastUpdated: '2026-08-18',
    },
    {
      id: '7',
      title: 'Domain Terminology & Glossary',
      category: 'Glossary',
      status: 'approved',
      summary: 'Standardized terms and definitions used across engineering teams.',
      owner: 'Core Team',
      lastUpdated: '2026-08-20',
    },
    {
      id: '8',
      title: 'System Architecture Documentation',
      category: 'Documentation',
      status: 'approved',
      summary: 'Overview of system design, network topologies, and data flows.',
      owner: 'Platform Team',
      lastUpdated: '2026-08-22',
    },
  ];

  const handleNavigate = (page, data = {}) => {
    setCurrentPage(page);
    if (data.query) setSearchQuery(data.query);
    if (data.assetId) setSelectedAssetId(data.assetId);
  };

  return (
    <AppShell appVersion="1.0.0">
      {currentPage === 'home' && (
        <HomePage
          onSearchClick={(query) => handleNavigate('search', { query })}
          onAssetClick={(id) => handleNavigate('detail', { assetId: id })}
        />
      )}

      {currentPage === 'search' && (
        <SearchPage
          query={searchQuery}
          results={mockSearchResults}
          onSearchChange={(query) => handleNavigate('search', { query })}
          onAssetClick={(id) => handleNavigate('detail', { assetId: id })}
        />
      )}

      {currentPage === 'detail' && (
        <DetailPage
          asset={mockSearchResults.find((a) => a.id === selectedAssetId)}
          relatedAssets={mockSearchResults.filter((a) => a.id !== selectedAssetId)}
          onRelatedClick={(id) => handleNavigate('detail', { assetId: id })}
        />
      )}

      {currentPage === 'index' && (
        <IndexPage
          assets={mockSearchResults}
          onAssetClick={(id) => handleNavigate('detail', { assetId: id })}
        />
      )}
    </AppShell>
  );
}

export default App;