import React from 'react';
import Button from './Button';
import './EmptyState.css';

const EmptyState = ({
  title = 'No items found',
  description = 'There is no data to display at this time.',
  icon = '📭',
  action = null,
}) => {
  return (
    <div className="empty-state">
      {icon && <div className="empty-state__icon">{icon}</div>}
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__description">{description}</p>
      {action && action.label && action.onClick && (
        <div className="empty-state__action">
          <Button onClick={action.onClick}>{action.label}</Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;