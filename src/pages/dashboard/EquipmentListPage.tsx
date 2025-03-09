import React, { useState, useEffect, KeyboardEvent, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Equipment, EQUIPMENT_CATEGORIES, EquipmentFormData } from '../../types/equipment';
import EquipmentDetailDrawer from '../../components/EquipmentDetailDrawer';
import { espressoEquipment, travelKitEquipment, userEquipmentSetups, calculateTotalValue } from '../../data/espressoEquipment';
import { useUserSettings } from '../../context/UserSettingsContext';
import EquipmentAddDrawer from '../../components/EquipmentAddDrawer';

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

const EquipmentListPage: React.FC = () => {
  // State declarations
  const navigate = useNavigate();
  const { settings } = useUserSettings();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [dropdownOpen, setDropdownOpen] = useState<DropdownState>({});
  const [deleteConfirm, setDeleteConfirm] = useState<DeleteConfirmState>({});
  const [isAddingEquipment, setIsAddingEquipment] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const equipmentRefs = useRef<(HTMLButtonElement | null)[]>([]);
  
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

  // Use the imported equipment setups
  const [equipmentSetups, setEquipmentSetups] = useState(userEquipmentSetups);

  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<EquipmentFormData | undefined>(undefined);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  // Filter equipment based on selected setup and categories
  const filteredEquipment = equipmentSetups
    .find(setup => setup.id === selectedSetup)?.equipment
    .filter(item => {
      // Filter by category
      if (selectedCategories.length === 0) {
        return true;
      }
      return selectedCategories.includes(item.category);
    }) || [];

  // Limit displayed items to 6 if not showing all
  const displayedEquipment = showAllItems ? filteredEquipment : filteredEquipment.slice(0, 6);
  const hasMoreItems = filteredEquipment.length > 6;

  // Set up refs for keyboard navigation
  useEffect(() => {
    equipmentRefs.current = equipmentRefs.current.slice(0, displayedEquipment.length);
  }, [displayedEquipment]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard navigation when drawer is open
      if (isDrawerOpen) {
        // Handle arrow up/down for navigation
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          e.preventDefault();
          
          const direction = e.key === 'ArrowUp' ? -1 : 1;
          const newIndex = selectedIndex + direction;
          
          // Ensure index is within bounds
          if (newIndex >= 0 && newIndex < displayedEquipment.length) {
            setSelectedIndex(newIndex);
            setSelectedEquipment(displayedEquipment[newIndex]);
          }
        }
        
        // Handle Command+E or Ctrl+E for edit
        if ((e.key === 'e' || e.key === 'E') && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          if (selectedEquipment) {
            handleEditEquipment(selectedEquipment.id);
          }
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown as any);
    return () => {
      window.removeEventListener('keydown', handleKeyDown as any);
    };
  }, [isDrawerOpen, selectedIndex, displayedEquipment, selectedEquipment]);

  // Update selected index when equipment changes
  useEffect(() => {
    if (selectedEquipment) {
      const index = displayedEquipment.findIndex(item => item.id === selectedEquipment.id);
      if (index !== -1) {
        setSelectedIndex(index);
      }
    }
  }, [selectedEquipment, displayedEquipment]);

  // Calculate total value using the imported function
  const totalValue = calculateTotalValue(filteredEquipment);

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
    // Find the equipment to edit
    const currentSetup = equipmentSetups.find(setup => setup.id === selectedSetup);
    const equipmentToEdit = currentSetup?.equipment.find(item => item.id === id);
    
    if (equipmentToEdit) {
      // Convert to EquipmentFormData format
      const formData: EquipmentFormData = {
        name: equipmentToEdit.name,
        description: equipmentToEdit.description || '',
        category: equipmentToEdit.category,
        price: equipmentToEdit.price?.toString() || '',
        purchaseDate: equipmentToEdit.purchaseDate || '',
        purchaseLocation: equipmentToEdit.purchaseLocation || '',
        link: equipmentToEdit.link || '',
        image: equipmentToEdit.image || '',
      };
      setEditingEquipment(formData);
      setIsAddDrawerOpen(true);
    }
  };

  const generateShareText = () => {
    const setup = equipmentSetups.find(s => s.id === selectedSetup) || equipmentSetups[0];
    return `Check out my coffee setup: ${setup.name} ${generatePublicUrl()}`;
  };

  const generateEmbedCode = () => {
    const url = generatePublicUrl();
    return `<iframe src="${url}/embed" width="100%" height="600" frameborder="0"></iframe>`;
  };

  // Function to export equipment list as CSV
  const exportToCsv = () => {
    // Define CSV headers
    const headers = [
      'Name',
      'Category',
      'Price',
      'Description',
      'Purchase Date',
      'Purchase Location',
      'Link'
    ];

    // Convert equipment data to CSV rows
    const csvRows = filteredEquipment.map(item => [
      item.name,
      item.category,
      item.price,
      item.description || '',
      item.purchaseDate || '',
      item.purchaseLocation || '',
      item.link || ''
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...csvRows.map(row => 
        row.map(cell => 
          // Escape quotes and wrap in quotes if contains comma
          cell.includes(',') ? `"${cell.replace(/"/g, '""')}"` : cell
        ).join(',')
      )
    ].join('\n');

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Set up download attributes
    const setupName = equipmentSetups.find(s => s.id === selectedSetup)?.name || 'Equipment';
    const fileName = `${setupName.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.csv`;
    
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Close filter dropdown if clicking outside
      if (isFilterOpen && !target.closest('.filter-dropdown')) {
        setIsFilterOpen(false);
      }
      
      // Close equipment dropdowns if clicking outside
      Object.keys(dropdownOpen).forEach(id => {
        if (dropdownOpen[id] && !target.closest(`.equipment-dropdown-${id}`)) {
          setDropdownOpen(prev => ({
            ...prev,
            [id]: false
          }));
          if (deleteConfirm[id]) {
            setDeleteConfirm(prev => ({
              ...prev,
              [id]: false
            }));
          }
        }
      });
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen, dropdownOpen, deleteConfirm]);

  const handleAddEquipment = () => {
    setEditingEquipment(undefined);
    setIsAddDrawerOpen(true);
  };

  const handleSaveEquipment = async (equipmentData: EquipmentFormData) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to save the equipment
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingEquipment) {
        // Update existing equipment
        console.log('Updating equipment:', equipmentData);
        // Find the current setup
        const currentSetup = equipmentSetups.find(setup => setup.id === selectedSetup);
        
        if (currentSetup) {
          // Update the equipment in the current setup
          const updatedEquipment = currentSetup.equipment.map(item => 
            item.id === selectedEquipment?.id 
              ? { 
                  ...item, 
                  name: equipmentData.name,
                  description: equipmentData.description || '',
                  category: equipmentData.category,
                  price: equipmentData.price,
                  purchaseDate: equipmentData.purchaseDate || '',
                  purchaseLocation: equipmentData.purchaseLocation || '',
                  link: equipmentData.link || '',
                  image: equipmentData.image || '',
                  updatedAt: new Date().toISOString()
                } 
              : item
          );
          
          // Update the equipment setups state
          setEquipmentSetups(prev => 
            prev.map(setup => 
              setup.id === selectedSetup 
                ? { ...setup, equipment: updatedEquipment } 
                : setup
            )
          );
        }
      } else {
        // Add new equipment
        console.log('Adding new equipment:', equipmentData);
        // Mock add to the local state
        const newEquipment: Equipment = {
          id: `temp-${Date.now()}`,
          name: equipmentData.name,
          description: equipmentData.description || '',
          category: equipmentData.category,
          price: equipmentData.price,
          purchaseDate: equipmentData.purchaseDate || '',
          purchaseLocation: equipmentData.purchaseLocation || '',
          link: equipmentData.link || '',
          image: equipmentData.image || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId: 'current-user',
          retailers: [],
          defaultRetailer: '',
          affiliateEnabled: false
        };
        
        // Add the new equipment to the current setup
        setEquipmentSetups(prev => 
          prev.map(setup => 
            setup.id === selectedSetup 
              ? { ...setup, equipment: [...setup.equipment, newEquipment] } 
              : setup
          )
        );
      }
      
      // Close the drawer
      setIsAddDrawerOpen(false);
      setEditingEquipment(undefined);
      
      // Show success message
      setSuccessMessage(editingEquipment ? 'Equipment updated successfully!' : 'Equipment added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving equipment:', error);
      setErrorMessage('Failed to save equipment. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Equipment Setups */}
      <div className="mb-8">
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-900">Setups</h2>
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

      {/* Filter by category */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedCategories([])}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategories.length === 0
                  ? 'bg-coffee-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFilterOpen(!isFilterOpen);
                }}
                className="filter-dropdown px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-700 hover:bg-gray-300 inline-flex items-center"
              >
                <span>Filter</span>
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isFilterOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[9999]">
                  <div className="py-1" role="menu">
                    {EQUIPMENT_CATEGORIES.map((category) => (
                      <label
                        key={category}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCategory(category);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleCategory(category);
                          }}
                          className="h-4 w-4 text-coffee-600 focus:ring-coffee-500 border-gray-300 rounded mr-2"
                        />
                        {category}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="inline-flex items-center px-4 py-1 border border-coffee-200 rounded-full shadow-sm text-sm font-medium text-coffee-700 bg-coffee-50 hover:bg-coffee-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-500"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share Setup
          </button>
        </div>

        {/* Selected category pills */}
        {selectedCategories.length > 0 && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-coffee-100 text-coffee-800 hover:bg-coffee-200"
                >
                  {category}
                  <svg className="ml-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ))}
            </div>
            <button
              onClick={() => setSelectedCategories([])}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Equipment list */}
      <div className="bg-white divide-y divide-gray-200">
        {displayedEquipment.map((item, index) => (
          <div 
            key={item.id} 
            className={`relative ${
              selectedIndex === index && isDrawerOpen ? 'bg-gray-100' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center px-1 py-2">
              <button
                ref={el => {
                  equipmentRefs.current[index] = el;
                }}
                onClick={() => {
                  setSelectedEquipment(item);
                  setSelectedIndex(index);
                  setIsDrawerOpen(true);
                }}
                className="flex-1 flex items-center rounded-md px-2 text-left"
              >
                <div className="min-w-0 flex-1 flex items-center">
                  {settings.showProductImages && (
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md overflow-hidden">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-10 w-10 object-cover"
                          loading="lazy"
                          onError={(e) => {
                            // Fallback image if loading fails
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=300&h=200&q=80';
                          }}
                        />
                      )}
                    </div>
                  )}
                  <div className={`min-w-0 flex-1 ${settings.showProductImages ? 'px-3' : ''} text-left`}>
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
                <Tooltip text="More options">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdown(item.id);
                    }}
                    className={`equipment-dropdown equipment-dropdown-${item.id} p-1 text-gray-400 hover:text-gray-600`}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </button>
                </Tooltip>
                {dropdownOpen[item.id] && (
                  <div className={`equipment-dropdown-${item.id} absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[9999]`}>
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
        
        <div className="px-4 py-3 bg-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddEquipment}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-coffee-600 hover:bg-coffee-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-500"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Equipment
              </button>
              
              {hasMoreItems && (
                <button
                  onClick={() => setShowAllItems(!showAllItems)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-500"
                >
                  {showAllItems ? (
                    <>
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                      </svg>
                      Show less
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                      Show all ({filteredEquipment.length})
                    </>
                  )}
                </button>
              )}
            </div>
            <div className="flex items-center">
              {settings.showTotalPrice && (
                <p className="text-sm font-medium text-gray-900 mr-3">
                  ${totalValue}
                </p>
              )}
              {settings.showCsvExport && (
                <Tooltip text="Export to CSV">
                  <button
                    onClick={exportToCsv}
                    className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-500"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                </Tooltip>
              )}
            </div>
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

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900">Share Your Setup</h3>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Public URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Public URL
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      readOnly
                      value={generatePublicUrl()}
                      className="block w-full h-9 px-3 bg-black/10 text-gray-900 rounded-md font-mono text-sm border-0 focus:ring-0"
                    />
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatePublicUrl());
                      // TODO: Add toast notification
                    }}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-500"
                  >
                    Copy link
                  </button>
                </div>
              </div>

              {/* Share on social */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Share on Social
                </label>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      const text = encodeURIComponent(generateShareText());
                      window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1DA1F2] hover:bg-[#1a8cd8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1DA1F2]"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    Share on Twitter
                  </button>
                  <button
                    onClick={() => {
                      const url = generatePublicUrl();
                      const title = encodeURIComponent('My Coffee Setup [r/espresso]');
                      window.open(`https://reddit.com/r/espresso/submit?url=${encodeURIComponent(url)}&title=${title}&sr=espresso`, '_blank');
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF4500] hover:bg-[#e63e00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF4500]"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.248 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                    </svg>
                    Share on Reddit
                  </button>
                </div>
              </div>

              {/* Embed code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Embed in Your Website
                </label>
                <div className="relative">
                  <textarea
                    rows={3}
                    readOnly
                    value={generateEmbedCode()}
                    className="block w-full bg-black/10 border-gray-300 rounded-md focus:ring-coffee-500 focus:border-coffee-500 sm:text-sm font-mono"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generateEmbedCode());
                      // TODO: Add toast notification
                    }}
                    className="absolute top-2 right-2 inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-500"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard shortcuts help */}
      {isDrawerOpen && (
        <div className="fixed bottom-4 right-4 bg-gray-800 bg-opacity-75 text-white text-xs rounded-md px-3 py-2 z-50">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="mr-2">↑↓</span>
              <span>Navigate</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">{navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}+E</span>
              <span>Edit</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">Esc</span>
              <span>Close</span>
            </div>
          </div>
        </div>
      )}

      {/* Equipment Add Drawer */}
      <EquipmentAddDrawer
        isOpen={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
        onSave={handleSaveEquipment}
        equipment={editingEquipment}
        isEditing={!!editingEquipment}
      />
    </div>
  );
};

export default EquipmentListPage; 