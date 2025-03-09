import React, { useState, useEffect, KeyboardEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EquipmentFormData, EQUIPMENT_CATEGORIES } from '../../types/equipment';

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

const AddEquipmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [inputMode, setInputMode] = useState<'url' | 'text'>('url');
  const [suggestions, setSuggestions] = useState<SuggestedEquipment[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showForm, setShowForm] = useState(false);
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

  // Fetch equipment data if in edit mode
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      setShowForm(true);
      fetchEquipmentData(id);
    }
  }, [id]);

  const fetchEquipmentData = async (equipmentId: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // For now, we'll mock the data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock data based on ID
      if (equipmentId === '1') {
        setFormData({
          name: 'Gaggia Classic Pro',
          description: 'Semi-automatic espresso machine with 58mm portafilter. Great for beginners and enthusiasts alike.',
          category: 'Espresso Machine',
          price: '449.00',
          purchaseDate: '2023-01-15',
          purchaseLocation: 'Whole Latte Love',
          link: 'https://www.wholelattelove.com/products/gaggia-classic-pro',
          image: 'https://images.unsplash.com/photo-1574914629385-46b1d7633c91?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        });
      } else if (equipmentId === '2') {
        setFormData({
          name: 'DF64 Grinder Gen 2',
          description: 'Single dose coffee grinder with 64mm flat burrs',
          category: 'Grinder',
          price: '280.00',
          purchaseDate: '2023-01-20',
          purchaseLocation: 'eBay',
          link: 'https://df64coffee.com/products/df64-gen-2-single-dose-coffee-grinder',
          image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        });
      }
      
      setIsLoading(false);
    } catch (error) {
      setError('Failed to load equipment data');
      setIsLoading(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    setShowSuggestions(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const processUrl = async () => {
    if (!url) {
      setError('Please enter a product URL');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // In a real app, this would be an API call to process the URL
      // For now, we'll simulate AI extraction with mock data
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data based on URL patterns
      let mockData: Partial<EquipmentFormData> = {};
      
      if (url.includes('gaggia')) {
        mockData = {
          name: 'Gaggia Classic Pro',
          category: 'Espresso Machine',
          price: '449.00',
          description: 'Semi-automatic espresso machine with 58mm portafilter',
          purchaseLocation: 'Gaggia Official Store',
          image: 'https://images.unsplash.com/photo-1574914629385-46b1d7633c91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80'
        };
      } else if (url.includes('amazon')) {
        mockData = {
          name: 'Coffee Scale with Timer',
          category: 'Scale',
          price: '19.99',
          description: 'Digital coffee scale with timer for pour over and espresso',
          purchaseLocation: 'Amazon',
          image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        };
      } else if (url.includes('df64') || url.includes('grinder')) {
        mockData = {
          name: 'DF64 Coffee Grinder',
          category: 'Grinder',
          price: '399.00',
          description: 'Single dose coffee grinder with 64mm flat burrs',
          purchaseLocation: 'Online Retailer',
          image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        };
      } else {
        mockData = {
          name: 'Coffee Accessory',
          category: 'Accessory',
          price: '29.99',
          description: 'Coffee accessory detected from URL',
          purchaseLocation: 'Online Store',
        };
      }
      
      // Set the link to the provided URL
      mockData.link = url;
      
      // Update form data with extracted information
      setFormData(prev => ({
        ...prev,
        ...mockData
      }));
      
      setShowForm(true);
    } catch (err) {
      setError('Failed to process URL. Please try again or enter details manually.');
    } finally {
      setIsProcessing(false);
    }
  };

  const processDescription = async () => {
    if (!description) {
      setError('Please enter a description of your equipment');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // In a real app, this would be an API call to process the description
      // For now, we'll simulate with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock suggestions based on keywords
      const mockSuggestions: SuggestedEquipment[] = [];
      
      if (description.toLowerCase().includes('gaggia')) {
        mockSuggestions.push({
          id: '1',
          name: 'Gaggia Classic Pro',
          category: 'Espresso Machine',
          price: '449.00',
          description: 'Semi-automatic espresso machine with commercial 58mm portafilter',
          image: 'https://images.unsplash.com/photo-1574914629385-46b1d7633c91',
          link: 'https://www.gaggia.com/classic-pro',
          retailer: 'Gaggia Direct'
        },
        {
          id: '2',
          name: 'Gaggia Brera',
          category: 'Espresso Machine',
          price: '539.00',
          description: 'Super-automatic espresso machine with built-in grinder',
          image: 'https://example.com/brera.jpg',
          link: 'https://www.gaggia.com/brera',
          retailer: 'Amazon'
        });
      }

      if (description.toLowerCase().includes('grinder')) {
        mockSuggestions.push({
          id: '3',
          name: 'DF64 Coffee Grinder',
          category: 'Grinder',
          price: '399.00',
          description: 'Single dose grinder with 64mm flat burrs',
          image: 'https://example.com/df64.jpg',
          link: 'https://example.com/df64',
          retailer: 'Specialty Coffee Retailer'
        },
        {
          id: '4',
          name: 'Baratza Encore',
          category: 'Grinder',
          price: '169.99',
          description: 'Entry-level conical burr grinder',
          image: 'https://example.com/encore.jpg',
          link: 'https://www.baratza.com/encore',
          retailer: 'Baratza'
        });
      }

      setSuggestions(mockSuggestions);
      setShowSuggestions(true);
    } catch (err) {
      setError('Failed to process description. Please try again or enter details manually.');
    } finally {
      setIsProcessing(false);
    }
  };

  const selectSuggestion = (suggestion: SuggestedEquipment) => {
    setFormData({
      name: suggestion.name,
      category: suggestion.category,
      price: suggestion.price,
      description: suggestion.description,
      purchaseLocation: suggestion.retailer,
      link: suggestion.link,
      image: suggestion.image,
      purchaseDate: '',
    });
    setShowSuggestions(false);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.category) {
      setError('Name and category are required');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to save the equipment
      // For now, we'll just simulate a delay and navigate back
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back to equipment list
      navigate('/dashboard/equipment');
    } catch (err) {
      setError('Failed to save equipment');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitInput = async () => {
    if (!description && !url) {
      setError('Please enter a description or product URL');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      if (url) {
        await processUrl();
      } else {
        await processDescription();
      }
    } catch (err) {
      setError('Failed to process input. Please try again or enter details manually.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!showForm) {
        handleSubmitInput();
      } else {
        const form = document.querySelector('form');
        if (form) {
          form.requestSubmit();
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown as any);
    return () => {
      document.removeEventListener('keydown', handleKeyDown as any);
    };
  }, [inputMode, url, description, showForm]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {isEditing ? 'Edit Equipment' : 'Add Equipment'}
          </h2>
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {!showForm && (
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div>
            <label htmlFor="input" className="block text-sm font-medium text-gray-700">
              Describe Your Equipment or Paste a Product URL
            </label>
            <div className="mt-1">
              <textarea
                id="input"
                name="input"
                rows={4}
                value={description || url}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.startsWith('http')) {
                    setUrl(value);
                    setDescription('');
                  } else {
                    setDescription(value);
                    setUrl('');
                  }
                  setShowSuggestions(false);
                }}
                className="input"
                placeholder="Example: I have a Gaggia Classic Pro espresso machine&#10;or&#10;https://example.com/coffee-product"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Enter a description of your equipment or paste a product URL, and we'll help you find matching products.
            </p>
            <div className="mt-4 flex items-center gap-6">
              <button
                type="button"
                onClick={handleSubmitInput}
                disabled={isProcessing}
                className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-coffee-600 hover:bg-coffee-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-500 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Submit
                    <ShortcutHint />
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="text-coffee-600 hover:text-coffee-500 text-sm"
              >
                or enter details manually →
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuggestions && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900">Did you mean...</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-coffee-500 cursor-pointer"
                onClick={() => selectSuggestion(suggestion)}
              >
                <div className="flex-shrink-0">
                  <img className="h-16 w-16 rounded object-cover" src={suggestion.image} alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">{suggestion.name}</p>
                    <p className="text-sm text-gray-500 truncate">{suggestion.description}</p>
                    <p className="text-sm font-medium text-coffee-600">${suggestion.price}</p>
                    <p className="text-xs text-gray-400">from {suggestion.retailer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {suggestions.length === 0 && (
            <div className="text-center py-4">
              <p className="text-gray-500">No matches found. Try adjusting your description or enter details manually.</p>
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="mt-4 text-coffee-600 hover:text-coffee-500"
              >
                Enter details manually
              </button>
            </div>
          )}
        </div>
      )}

      {showForm && (
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mt-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleFormChange}
                    className="input"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category *
                </label>
                <div className="mt-1">
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleFormChange}
                    className="input"
                  >
                    <option value="">Select a category</option>
                    {EQUIPMENT_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    required
                    value={formData.price}
                    onChange={handleFormChange}
                    className="input pl-7"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleFormChange}
                    className="input"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700">
                  Purchase Date
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="purchaseDate"
                    id="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleFormChange}
                    className="input"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="purchaseLocation" className="block text-sm font-medium text-gray-700">
                  Purchase Location
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="purchaseLocation"
                    id="purchaseLocation"
                    value={formData.purchaseLocation}
                    onChange={handleFormChange}
                    className="input"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                  Product Link
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    name="link"
                    id="link"
                    value={formData.link}
                    onChange={handleFormChange}
                    className="input"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    name="image"
                    id="image"
                    value={formData.image}
                    onChange={handleFormChange}
                    className="input"
                  />
                </div>
              </div>

              {formData.image && (
                <div className="sm:col-span-6">
                  <p className="block text-sm font-medium text-gray-700 mb-2">Image Preview</p>
                  <img 
                    src={formData.image} 
                    alt="Equipment preview" 
                    className="h-48 w-auto object-contain border border-gray-200 rounded-md"
                  />
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-end">
              <Link
                to="/dashboard/equipment"
                className="mr-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-coffee-600 hover:bg-coffee-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-500 disabled:opacity-50 inline-flex items-center"
              >
                {isLoading ? 'Saving...' : (
                  <>
                    Save
                    <ShortcutHint />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddEquipmentPage; 