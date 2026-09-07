import React from 'react';
import DetailViewer from '../components/display/DetailViewer';
import MetadataPanel from '../components/display/MetadataPanel';
import RelatedLinks from '../components/display/RelatedLinks';
import Button from '../components/shared/Button';
import './DetailPage.css';

/**
 * DetailPage Component
 * Display full asset details with metadata and related assets
 * 
 * @component
 * @example
 * <DetailPage assetId="1" onRelatedClick={(id) => {}} />
 */
const DetailPage = ({
  asset = {},
  relatedAssets = [],
  onRelatedClick = () => {},
}) => {
  // Sample asset if none provided
  const defaultAsset = {
    id: '1',
    title: 'API Design Standard',
    category: 'Standards',
    status: 'approved',
    content: `
      <h2>Overview</h2>
      <p>This standard defines best practices for designing RESTful APIs at our organization.</p>
      
      <h2>Key Principles</h2>
      <ul>
        <li>Use HTTP verbs correctly (GET, POST, PUT, DELETE)</li>
        <li>Resource-oriented URLs</li>
        <li>Version your APIs</li>
        <li>Use proper HTTP status codes</li>
        <li>Implement proper error handling</li>
      </ul>
      
      <h2>Examples</h2>
      <p>See the related resources for concrete examples.</p>
    `,
    metadata: {
      owner: 'Platform Team',
      ownerEmail: 'platform@example.com',
      createdDate: '2024-01-15',
      lastUpdatedDate: '2024-08-20',
      lastUpdatedBy: 'John Smith',
      version: '2.1',
    },
  };

  const displayAsset = asset.id ? asset : defaultAsset;

  const defaultRelated = [
    { id: '2', title: 'REST Error Handling Best Practice', category: 'Best Practice' },
    { id: '3', title: 'API Versioning Playbook', category: 'Playbook' },
    { id: '4', title: 'GraphQL vs REST Comparison', category: 'ADR' },
  ];

  const displayRelated = relatedAssets.length > 0 ? relatedAssets : defaultRelated;

  return (
    <div className="detail-page">
      {/* Breadcrumb */}
      <div className="detail-page__breadcrumb">
        <Button variant="tertiary" size="small">← Back</Button>
      </div>

      {/* Main Detail View */}
      <div className="detail-page__container">
        <DetailViewer
          title={displayAsset.title}
          category={displayAsset.category}
          status={displayAsset.status}
          content={displayAsset.content}
          metadata={displayAsset.metadata}
          relatedAssets={displayRelated}
          onRelatedClick={onRelatedClick}
        />
      </div>

      {/* Actions */}
      <div className="detail-page__actions">
        <Button variant="secondary" size="medium">Edit</Button>
        <Button variant="secondary" size="medium">Share</Button>
        <Button variant="secondary" size="medium">Print</Button>
        <Button variant="tertiary" size="medium">Report Issue</Button>
      </div>
    </div>
  );
};

export default DetailPage;
