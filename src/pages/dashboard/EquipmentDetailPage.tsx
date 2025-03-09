import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Equipment } from '../../types/equipment';

const EquipmentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll mock the data
    const fetchEquipment = async () => {
      setIsLoading(true);
      try {
        // Mock data
        const mockEquipment: Equipment = {
          id: id || '1',
          name: 'Gaggia Classic Pro',
          description: 'Semi-automatic espresso machine with 58mm portafilter. Great for beginners and enthusiasts alike.',
          category: 'Espresso Machine',
          price: '$449.00',
          purchaseDate: '2023-01-15',
          purchaseLocation: 'Whole Latte Love',
          link: 'https://www.wholelattelove.com/products/gaggia-classic-pro',
          image: 'https://images.unsplash.com/photo-1574914629385-46b1d7633c91?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          createdAt: '2023-01-16T12:00:00Z',
          updatedAt: '2023-01-16T12:00:00Z',
          userId: '1',
          retailers: [
            {
              retailerId: 'wholelattelove',
              url: 'https://www.wholelattelove.com/products/gaggia-classic-pro',
              price: 449.00,
              inStock: true,
              lastChecked: '2024-03-14T00:00:00Z',
              affiliateEnabled: true
            },
            {
              retailerId: 'amazon',
              url: 'https://www.amazon.com/Gaggia-RI9380-46-Classic-Espresso-Machine/dp/B07RQ3NL76',
              price: 449.00,
              inStock: true,
              lastChecked: '2024-03-14T00:00:00Z',
              affiliateEnabled: true
            }
          ],
          defaultRetailer: 'wholelattelove',
          affiliateEnabled: true
        };
        
        // Simulate API delay
        setTimeout(() => {
          setEquipment(mockEquipment);
          setIsLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to load equipment details');
        setIsLoading(false);
      }
    };

    fetchEquipment();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      // In a real app, this would be an API call
      // For now, we'll just navigate back
      navigate('/dashboard/equipment');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-coffee-600"></div>
      </div>
    );
  }

  if (error || !equipment) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 my-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error || 'Equipment not found'}</p>
            <div className="mt-4">
              <Link
                to="/dashboard/equipment"
                className="text-sm font-medium text-red-700 hover:text-red-600"
              >
                Go back to equipment list
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {equipment.name}
          </h2>
          <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
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
        <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
          <Link
            to={`/dashboard/equipment/edit/${equipment.id}`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-500"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>

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
          </dl>
        </div>
      </div>

      {equipment.image && (
        <div className="mt-8">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Image</h3>
          <div className="bg-white p-4 shadow sm:rounded-lg">
            <img
              src={equipment.image}
              alt={equipment.name}
              className="w-full h-auto max-h-96 object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      <div className="mt-8">
        <Link
          to="/dashboard/equipment"
          className="text-coffee-600 hover:text-coffee-500"
        >
          &larr; Back to equipment list
        </Link>
      </div>
    </div>
  );
};

export default EquipmentDetailPage; 