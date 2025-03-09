import React from 'react';
import { RetailerLink } from '../types/equipment';
import { affiliateService } from '../services/affiliateService';

interface ProductLinkProps {
  retailerLink: RetailerLink;
  userId?: string;
  className?: string;
  children?: React.ReactNode;
}

const ProductLink: React.FC<ProductLinkProps> = ({
  retailerLink,
  userId,
  className,
  children
}) => {
  const handleClick = async (e: React.MouseEvent) => {
    // Track the click
    await affiliateService.trackClick(retailerLink.retailerId, userId);
    
    // Get the affiliate URL
    const affiliateUrl = await affiliateService.getAffiliateUrl(
      retailerLink,
      userId,
      {
        source: 'coffee-kit',
        campaign: 'product-link',
        medium: 'web'
      }
    );

    // Open in new tab
    window.open(affiliateUrl, '_blank');
    e.preventDefault();
  };

  return (
    <a
      href={retailerLink.url}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children || (
        <div className="inline-flex items-center space-x-1">
          <span>{retailerLink.retailerId}</span>
          <span className="text-sm text-gray-500">${retailerLink.price.toFixed(2)}</span>
          {!retailerLink.inStock && (
            <span className="text-xs text-red-500">(Out of Stock)</span>
          )}
        </div>
      )}
    </a>
  );
};

export default ProductLink; 