import React, { useState, useEffect } from 'react';
import Drawer from './Drawer';
import { Equipment } from '../types/equipment';

// Simple tooltip component
const Tooltip = ({ children, text }: { children: React.ReactNode; text: string }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
      {show && (
        <div className="absolute z-10 px-2 py-1 text-xs text-white bg-gray-800 rounded-md whitespace-nowrap bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 opacity-90">
          {text}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 border-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
};

// If you have a type definition file, you should update it there instead
interface RetailerLink {
  retailerId: string;
  price: number;
  url: string;
  affiliateCode?: string; // Make it optional
}

interface EquipmentDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  equipment: Equipment | null;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

const EquipmentDetailDrawer: React.FC<EquipmentDetailDrawerProps> = ({
  isOpen,
  onClose,
  equipment,
  onDelete,
  onEdit
}) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const handleDelete = () => {
    if (!equipment) return;
    
    if (!isConfirmingDelete) {
      setIsConfirmingDelete(true);
      return;
    }
    
    if (onDelete) {
      onDelete(equipment.id);
      onClose();
    }
  };

  const handleEdit = () => {
    if (!equipment || !onEdit) return;
    onEdit(equipment.id);
    onClose();
  };

  // Reset confirmation state when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setIsConfirmingDelete(false);
    }
  }, [isOpen]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      // Command+E or Ctrl+E for edit
      if ((e.key === 'e' || e.key === 'E') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (equipment && onEdit) {
          handleEdit();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown as any);
    return () => {
      window.removeEventListener('keydown', handleKeyDown as any);
    };
  }, [isOpen, equipment, onEdit]);

  // Add styles to ensure title truncation
  useEffect(() => {
    if (isOpen) {
      const styleEl = document.createElement('style');
      styleEl.id = 'drawer-title-style';
      styleEl.innerHTML = `
        /* Force title to truncate and not wrap */
        [id^="headlessui-dialog-title-"] {
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          white-space: nowrap !important;
          max-width: calc(100% - 3rem) !important;
          display: block !important;
        }
        
        /* Remove tooltip from close button */
        .headlessui-dialog-close .sr-only {
          display: none;
        }
        
        /* Ensure drawer content doesn't overflow */
        .drawer-content {
          max-width: 100%;
          overflow-x: hidden;
        }
      `;
      document.head.appendChild(styleEl);
      
      return () => {
        const existingStyle = document.getElementById('drawer-title-style');
        if (existingStyle) {
          existingStyle.remove();
        }
      };
    }
  }, [isOpen]);

  // Format date if available
  const formattedDate = equipment?.purchaseDate 
    ? new Date(equipment.purchaseDate).toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    : null;

  // Check if this is an affiliate product
  const isAffiliate = equipment?.retailers?.some(
    retailer => 'affiliateCode' in retailer && retailer.affiliateCode
  );

  if (!equipment) return null;

  return (
    <Drawer 
      isOpen={isOpen} 
      onClose={onClose}
      title={equipment.name}
    >
      <div className="flex flex-col h-full drawer-content">
        <div className="flex-1 overflow-y-auto p-4 overflow-x-hidden">
          {/* Category row */}
          <div className="flex items-center">
            <span className="bg-coffee-100 text-coffee-800 px-2 py-1 rounded-full text-xs font-medium">
              {equipment.category}
            </span>
          </div>

          {/* Affiliate badge if applicable */}
          {isAffiliate && (
            <div className="flex items-center mt-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                Special promo code
              </span>
            </div>
          )}
          
          {/* Description */}
          {equipment.description && (
            <div className="mt-3">
              <p className="text-sm text-gray-700">{equipment.description}</p>
            </div>
          )}
          
          {/* Purchase info */}
          {(formattedDate || equipment.purchaseLocation) && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mt-4">
              {formattedDate && (
                <div className="flex items-center">
                  <svg className="mr-1.5 h-4 w-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate">Purchased {formattedDate}</span>
                </div>
              )}
              {equipment.purchaseLocation && (
                <div className="flex items-center">
                  <svg className="mr-1.5 h-4 w-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="truncate">{equipment.purchaseLocation}</span>
                </div>
              )}
            </div>
          )}

          {/* Product link */}
          {equipment.link && (
            <div className="mt-6">
              <a
                href={equipment.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-coffee-600 hover:text-coffee-500"
              >
                <svg className="mr-1.5 h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="truncate">View product page</span>
              </a>
            </div>
          )}

          {/* Retailers section */}
          {equipment.retailers && equipment.retailers.length > 0 && (
            <div className="mt-6 border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Available at retailers</h3>
              <div className="space-y-3">
                {equipment.retailers.map((retailer) => (
                  <div key={retailer.retailerId} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <div className="font-medium text-sm truncate">{retailer.retailerId}</div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">{retailer.price.toFixed(2)}</span>
                      {('affiliateCode' in retailer && retailer.affiliateCode) ? (
                        <span className="text-xs text-green-600 font-medium truncate max-w-[120px]">
                          {`Save 10% with code: ${retailer.affiliateCode}`}
                        </span>
                      ) : null}
                      <a 
                        href={retailer.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs bg-white px-2 py-1 rounded border border-gray-200 text-coffee-600 hover:text-coffee-700"
                      >
                        View
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-3">
            <button
              onClick={handleEdit}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-500"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className={`p-2 border border-transparent rounded-md text-white ${
                isConfirmingDelete 
                  ? 'bg-red-700 hover:bg-red-800' 
                  : 'bg-red-600 hover:bg-red-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
              aria-label={isConfirmingDelete ? "Confirm Delete" : "Delete"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
          
          {/* Keyboard shortcuts hint */}
          <div className="mt-3 text-center text-xs text-gray-500">
            <span className="inline-flex items-center">
              <kbd className="mx-1 px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">
                {navigator.platform.indexOf('Mac') !== -1 ? '⌘' : 'Ctrl'}+E
              </kbd>
              to edit
            </span>
            <span className="mx-2">•</span>
            <span className="inline-flex items-center">
              <kbd className="mx-1 px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">Esc</kbd>
              to close
            </span>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default EquipmentDetailDrawer; 