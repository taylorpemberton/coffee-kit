import React, { useState } from 'react';
import Drawer from './Drawer';
import { Equipment } from '../types/equipment';

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

  if (!equipment) return null;

  return (
    <Drawer 
      isOpen={isOpen} 
      onClose={() => {
        setIsConfirmingDelete(false);
        onClose();
      }} 
      title={equipment.name}
    >
      <div className="flex flex-col h-full relative">
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
          <div className="space-y-6 pb-20">
            <div className="flex flex-col">
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <span className="bg-coffee-100 text-coffee-800 px-2 py-1 rounded-full text-xs">
                    {equipment.category}
                  </span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <span>{equipment.price}</span>
                </div>
                {equipment.purchaseDate && (
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span>Purchased on {new Date(equipment.purchaseDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>

            {equipment.image && (
              <div>
                <img
                  src={equipment.image}
                  alt={equipment.name}
                  className="w-full h-auto max-h-64 object-contain rounded-lg"
                />
              </div>
            )}

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Equipment Details</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Details about your coffee equipment.</p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{equipment.name}</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Category</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{equipment.category}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Price</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{equipment.price}</dd>
                  </div>
                  {equipment.description && (
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Description</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{equipment.description}</dd>
                    </div>
                  )}
                  {equipment.purchaseDate && (
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Purchase Date</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {new Date(equipment.purchaseDate).toLocaleDateString()}
                      </dd>
                    </div>
                  )}
                  {equipment.purchaseLocation && (
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Purchase Location</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{equipment.purchaseLocation}</dd>
                    </div>
                  )}
                  {equipment.link && (
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Product Link</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <a
                          href={equipment.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-coffee-600 hover:text-coffee-500"
                        >
                          {equipment.link}
                        </a>
                      </dd>
                    </div>
                  )}
                  {equipment.retailers && equipment.retailers.length > 0 && (
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Retailers</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <ul className="divide-y divide-gray-200">
                          {equipment.retailers.map((retailer) => (
                            <li key={retailer.retailerId} className="py-2">
                              <div className="flex justify-between">
                                <span>{retailer.retailerId}</span>
                                <span>${retailer.price.toFixed(2)}</span>
                              </div>
                              <a 
                                href={retailer.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-coffee-600 hover:text-coffee-500 text-sm"
                              >
                                View at retailer
                              </a>
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        {/* Fixed bottom action buttons */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 pt-3 pb-3 bg-white px-4 sm:px-6">
          <div className="flex space-x-3">
            <button
              onClick={handleEdit}
              className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-500"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className={`flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isConfirmingDelete 
                  ? 'bg-red-700 hover:bg-red-800' 
                  : 'bg-red-600 hover:bg-red-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
            >
              {isConfirmingDelete ? 'Confirm Delete' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default EquipmentDetailDrawer; 