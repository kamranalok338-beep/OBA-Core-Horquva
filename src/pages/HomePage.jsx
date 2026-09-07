import React from 'react';
import SearchBar from '../components/search/SearchBar';
import AssetCard from '../components/display/AssetCard';
import Button from '../components/shared/Button';
import './HomePage.css';

/**
 * HomePage Component
 * Landing page with quick search and featured knowledge assets
 * 
 * @component
 * @example
 * <HomePage onSearchClick={(query) => {}} onAssetClick={(id) => {}} />
 */
const HomePage = ({ onSearchClick = () => {}, onAssetClick = () => {} }) => {
  const featuredAssets = [
    {
      id: '1',
      title: 'API Design Standard',
      category: 'Standards',
      status: 'approved',
      summary: 'Guidelines for designing RESTful APIs at our organization.',
      owner: 'Platform Team',
      lastUpdated: new Date(),
    },
    {
      id: '2',
      title: 'Database Naming Playbook',
      category: 'Playbooks',
      status: 'approved',
      summary: 'Best practices for naming database tables, columns, and indexes.',
      owner: 'Data Team',
      lastUpdated: new Date(),
    },
    {
      id: '3',
      title: 'Microservices Best Practice',
      category: 'Best Practices',
      status: 'approved',
      summary: 'Key patterns and anti-patterns for building microservices.',
      owner: 'Architecture Team',
      lastUpdated: new Date(),
    },
  ];

  const suggestions = [
    'API Design Standard',
    'Database Naming Playbook',
    'Microservices Best Practice',
    'Security Runbook',
    'Kubernetes Lessons Learned',
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-page__hero">
        <div className="home-page__hero-content">
          <h1 className="home-page__title">Knowledge Management Platform</h1>
          <p className="home-page__subtitle">
            Discover engineering standards, playbooks, and best practices
          </p>

          {/* Search Bar */}
          <div className="home-page__search">
            <SearchBar
              placeholder="Search standards, playbooks, runbooks..."
              onSearch={onSearchClick}
              suggestions={suggestions}
            />
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="home-page__quick-links">
        <h2>Browse by Category</h2>
        <div className="home-page__categories">
          <Button variant="secondary" size="medium">📋 Standards</Button>
          <Button variant="secondary" size="medium">✨ Best Practices</Button>
          <Button variant="secondary" size="medium">📖 Playbooks</Button>
          <Button variant="secondary" size="medium">⚙️ Runbooks</Button>
          <Button variant="secondary" size="medium">💡 Lessons Learned</Button>
          <Button variant="secondary" size="medium">🏗️ ADRs</Button>
        </div>
      </section>

      {/* Featured Assets */}
      <section className="home-page__featured">
        <h2>Featured Knowledge</h2>
        <div className="home-page__grid">
          {featuredAssets.map((asset) => (
            <AssetCard
              key={asset.id}
              {...asset}
              onClick={onAssetClick}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-page__cta">
        <h2>Get Started</h2>
        <p>Explore our complete knowledge base or contribute your own expertise.</p>
        <div className="home-page__cta-buttons">
          <Button variant="primary" size="large">Browse All</Button>
          <Button variant="secondary" size="large">Contribute</Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
