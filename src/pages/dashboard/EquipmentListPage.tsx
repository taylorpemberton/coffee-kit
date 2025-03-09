import React, { useState, useEffect, KeyboardEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Equipment, EQUIPMENT_CATEGORIES, EquipmentFormData } from '../../types/equipment';
import EquipmentDetailDrawer from '../../components/EquipmentDetailDrawer';

interface DropdownState {
  [key: string]: boolean;
}

interface DeleteConfirmState {
  [key: string]: boolean;
}

interface SuggestedEquipment {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  link: string;
  retailer: string;
}

interface EquipmentSetup {
  id: string;
  name: string;
  description: string;
  equipment: Equipment[];
  createdAt: string;
  updatedAt: string;
}

const ShortcutHint = () => (
  <span className="ml-2 text-xs text-white/70">
    {navigator.platform.toLowerCase().includes('mac') ? (
      <>
        <kbd className="font-sans">⌘</kbd>
        <span className="mx-0.5">+</span>
        <kbd className="font-sans">Enter</kbd>
      </>
    ) : (
      <>
        <kbd className="font-sans">Ctrl</kbd>
        <span className="mx-0.5">+</span>
        <kbd className="font-sans">Enter</kbd>
      </>
    )}
  </span>
);

const EquipmentListPage: React.FC = () => {
  // State declarations
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [dropdownOpen, setDropdownOpen] = useState<DropdownState>({});
  const [deleteConfirm, setDeleteConfirm] = useState<DeleteConfirmState>({});
  const [isAddingEquipment, setIsAddingEquipment] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Add Equipment form states
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestedEquipment[]>([]);
  const [formData, setFormData] = useState<EquipmentFormData>({
    name: '',
    description: '',
    category: '',
    price: '',
    purchaseDate: '',
    purchaseLocation: '',
    link: '',
    image: '',
  });

  const [selectedSetup, setSelectedSetup] = useState<string>('default');
  const [isAddingSetup, setIsAddingSetup] = useState(false);
  const [setupFormData, setSetupFormData] = useState({
    name: '',
    description: '',
  });

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Function declarations
  const toggleDropdown = (id: string) => {
    setDropdownOpen(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    if (deleteConfirm[id]) {
      setDeleteConfirm(prev => ({
        ...prev,
        [id]: false
      }));
    }
  };

  const handleDelete = (id: string) => {
    if (!deleteConfirm[id]) {
      setDeleteConfirm(prev => ({
        ...prev,
        [id]: true
      }));
    } else {
      console.log('Deleting item:', id);
      toggleDropdown(id);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSetupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating new setup:', setupFormData);
    setIsAddingSetup(false);
    setSetupFormData({ name: '', description: '' });
  };

  // Mock data for equipment list
  const equipmentList: Equipment[] = [
    {
      id: '1',
      name: 'Gaggia Classic Pro',
      description: 'Semi-automatic espresso machine with 58mm portafilter',
      category: 'Espresso Machine',
      price: '$340.00',
      purchaseDate: '2023-01-15',
      purchaseLocation: 'eBay',
      link: 'https://www.gaggia-na.com/products/gaggia-classic-pro',
      image: 'https://images.unsplash.com/photo-1574914629385-46b1d7633c91?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      createdAt: '2023-01-16T12:00:00Z',
      updatedAt: '2023-01-16T12:00:00Z',
      userId: '1',
      retailers: [],
      defaultRetailer: 'amazon',
      affiliateEnabled: true
    },
    {
      id: '2',
      name: 'DF64 Grinder Gen 2',
      description: 'Single dose coffee grinder with 64mm flat burrs',
      category: 'Grinder',
      price: '$280.00',
      purchaseDate: '2023-01-20',
      purchaseLocation: 'eBay',
      link: 'https://df64coffee.com/products/df64-gen-2-single-dose-coffee-grinder',
      image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      createdAt: '2023-01-21T12:00:00Z',
      updatedAt: '2023-01-21T12:00:00Z',
      userId: '1',
      retailers: [],
      defaultRetailer: 'df64coffee',
      affiliateEnabled: true
    }
  ];

  // Mock data for equipment setups
  const equipmentSetups: EquipmentSetup[] = [
    {
      id: 'default',
      name: 'Main Setup',
      description: 'My primary coffee equipment',
      equipment: equipmentList,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
    },
    {
      id: 'travel',
      name: 'Travel Kit',
      description: 'Portable coffee setup for travel',
      equipment: [],
      createdAt: '2023-02-01T00:00:00Z',
      updatedAt: '2023-02-01T00:00:00Z',
    },
  ];

  const filteredEquipment = equipmentList
    .filter(item => {
      // First filter by selected setup
      const setup = equipmentSetups.find(s => s.id === selectedSetup);
      if (selectedSetup && setup) {
        return setup.equipment.some(e => e.id === item.id);
      }
      return true;
    })
    .filter(item => {
      // Then filter by category
      if (selectedCategories.length === 0) {
        return true;
      }
      return selectedCategories.includes(item.category);
    });

  const totalValue = filteredEquipment
    .reduce((sum, item) => {
      const price = parseFloat(item.price.replace('$', '').replace(',', ''));
      return sum + price;
    }, 0)
    .toFixed(2);

  const generatePublicUrl = () => {
    const setup = equipmentSetups.find(s => s.id === selectedSetup) || equipmentSetups[0];
    return `https://coffee-kit.com/${setup.id}`;
  };

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(prev => prev.filter(c => c !== category));
    } else {
      setSelectedCategories(prev => [...prev, category]);
    }
  };

  const handleDeleteEquipment = (id: string) => {
    console.log('Deleting equipment:', id);
    // In a real app, this would be an API call to delete the equipment
    // For now, we'll just close the drawer
    setIsDrawerOpen(false);
    setSelectedEquipment(null);
  };

  const handleEditEquipment = (id: string) => {
    navigate(`/dashboard/equipment/edit/${id}`);
  };

  return (
    <div className="relative">
      {/* Equipment Setups */}
      <div className="mb-8">
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-900">Equipment Setups</h2>
        </div>

        {isAddingSetup ? (
          <form onSubmit={handleSetupSubmit} className="bg-white p-4 rounded-lg shadow mb-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="setupName" className="block text-sm font-medium text-gray-700">
                  Setup Name *
                </label>
                <input
                  type="text"
                  id="setupName"
                  name="name"
                  required
                  value={setupFormData.name}
                  onChange={(e) => setSetupFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Aeropress Setup, Travel Kit"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coffee-500 focus:ring-coffee-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="setupDescription" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="setupDescription"
                  name="description"
                  rows={2}
                  value={setupFormData.description}
                  onChange={(e) => setSetupFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your setup..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coffee-500 focus:ring-coffee-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingSetup(false);
                    setSetupFormData({ name: '', description: '' });
                  }}
                  className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-coffee-600 hover:bg-coffee-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-500"
                >
                  Create Setup
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {equipmentSetups.map((setup) => (
              <div
                key={setup.id}
                onClick={() => setSelectedSetup(setup.id === selectedSetup ? '' : setup.id)}
                className={`relative rounded-lg border p-3 cursor-pointer transition-colors ${
                  setup.id === selectedSetup
                    ? 'border-coffee-500 bg-coffee-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                <div className="flex flex-col">
                  <h3 className="text-sm font-medium text-gray-900">{setup.name}</h3>
                  <p className="mt-0.5 text-xs text-gray-500 line-clamp-2">{setup.description}</p>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-coffee-100 text-coffee-800">
                      {setup.equipment.length} items
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => setIsAddingSetup(true)}
              className="relative rounded-lg border border-dashed border-gray-300 p-3 hover:border-coffee-500 transition-colors group"
            >
              <div className="flex flex-col items-center justify-center h-full text-gray-500 group-hover:text-coffee-600">
                <span className="text-sm font-medium">+ Add setup</span>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Equipment list */}
      <div className="bg-white divide-y divide-gray-200">
        {filteredEquipment.map((item) => (
          <div key={item.id} className="relative">
            <div className="flex items-center px-3 py-2">
              <button
                onClick={() => {
                  setSelectedEquipment(item);
                  setIsDrawerOpen(true);
                }}
                className="flex-1 flex items-center hover:bg-gray-50 rounded-md px-2 text-left"
              >
                <div className="min-w-0 flex-1 flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md overflow-hidden">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-10 w-10 object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1 px-3 text-left">
                    <div>
                      <p className="text-sm font-medium text-coffee-600 truncate text-left">
                        {item.name}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500 text-left">
                        <span className="truncate">{item.category}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {item.price}
                  </p>
                </div>
              </button>
              <div className="relative ml-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown(item.id);
                  }}
                  className="equipment-dropdown p-1 text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
                {dropdownOpen[item.id] && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[9999]">
                    <div className="py-1" role="menu">
                      <button
                        onClick={() => {
                          setSelectedEquipment(item);
                          setIsDrawerOpen(true);
                          toggleDropdown(item.id);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          navigate(`/dashboard/equipment/edit/${item.id}`);
                          toggleDropdown(item.id);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          deleteConfirm[item.id]
                            ? 'text-red-600 font-medium bg-red-50 hover:bg-red-100'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {deleteConfirm[item.id] ? 'Click again to confirm' : 'Delete'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="px-4 py-3 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setIsAddingEquipment(!isAddingEquipment);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-coffee-600 hover:bg-coffee-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-500"
              >
                {isAddingEquipment ? 'Cancel' : 'Add Equipment'}
              </button>
            </div>
            <p className="text-sm pr-10 font-medium text-gray-900">
              ${totalValue}
            </p>
          </div>
        </div>
      </div>

      {/* Equipment Detail Drawer */}
      <EquipmentDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        equipment={selectedEquipment}
        onDelete={handleDeleteEquipment}
        onEdit={handleEditEquipment}
      />
    </div>
  );
};

export default EquipmentListPage; 