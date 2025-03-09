import { Equipment } from '../types/equipment';

// Function to generate Unsplash image URLs based on keywords
const getUnsplashImageUrl = (title: string): string => {
  // Extract keywords from the title
  const keywords = title.toLowerCase().split(' ');
  const relevantKeywords = ['coffee', 'espresso', 'grinder', 'scale', 'tamper', 'portafilter', 'machine'];
  
  // Find matching keywords
  const matchedKeywords = keywords.filter(word => 
    relevantKeywords.some(keyword => word.includes(keyword))
  );
  
  // Use the first matched keyword or default to 'coffee'
  const searchTerm = matchedKeywords.length > 0 ? matchedKeywords[0] : 'coffee';
  
  // Generate a deterministic "random" number based on the title for variety
  const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const photoId = hash % 30; // Limit to 30 different photos
  
  // Use specific Unsplash photo IDs for more reliable loading
  const coffeePhotoIds = [
    'Cdz_lvnl37Q', 'XtUd5SiX464', 'KixfBEdyp64', 'ouX2QgQMHbU', 
    'TYIzeCiZ_60', 'Lz4ORwQXX7c', 'nBtmglfY0HU', 'CSQQ6_T0sks',
    'POFG8fHaxSw', 'bELvIwRiGCU', 'N6g5xpM0E14', 'Nl7eLS8E2Ss',
    'tNALoIZhqVM', 'aX_ljOOyWJY', 'Krx-v_1oHNU', 'nzyzAUsbV0M'
  ];
  
  // Select a photo ID based on the hash
  const selectedPhotoId = coffeePhotoIds[hash % coffeePhotoIds.length];
  
  // Return a direct Unsplash photo URL
  return `https://images.unsplash.com/photo-${selectedPhotoId}?auto=format&fit=crop&w=300&h=200&q=80`;
};

// Sample equipment data for user 1's "Main Setup"
export const espressoEquipment: Equipment[] = [
  {
    id: '1',
    name: 'Gaggia Classic Pro (Used)',
    description: 'Semi-automatic espresso machine with 58mm portafilter',
    category: 'Espresso Machine',
    price: '$340.00',
    purchaseDate: '2023-01-15',
    purchaseLocation: 'eBay',
    link: 'https://www.gaggia-na.com/products/gaggia-classic-pro',
    image: getUnsplashImageUrl('Gaggia Classic Pro Espresso Machine'),
    createdAt: '2023-01-16T12:00:00Z',
    updatedAt: '2023-01-16T12:00:00Z',
    userId: '1',
    retailers: [
      {
        retailerId: 'gaggia',
        url: 'https://www.gaggia-na.com/products/gaggia-classic-pro',
        price: 449.00,
        inStock: true,
        lastChecked: '2024-03-14T00:00:00Z',
        affiliateEnabled: true
      }
    ],
    defaultRetailer: 'gaggia',
    affiliateEnabled: true
  },
  {
    id: '2',
    name: 'DF64 Grinder Gen 2 (Used)',
    description: 'Single dose coffee grinder with 64mm flat burrs',
    category: 'Grinder',
    price: '$280.00',
    purchaseDate: '2023-01-20',
    purchaseLocation: 'eBay',
    link: 'https://df64coffee.com/products/df64-gen-2-single-dose-coffee-grinder',
    image: getUnsplashImageUrl('DF64 Grinder Gen 2'),
    createdAt: '2023-01-21T12:00:00Z',
    updatedAt: '2023-01-21T12:00:00Z',
    userId: '1',
    retailers: [
      {
        retailerId: 'df64coffee',
        url: 'https://df64coffee.com/products/df64-gen-2-single-dose-coffee-grinder',
        price: 399.00,
        inStock: true,
        lastChecked: '2024-03-14T00:00:00Z',
        affiliateEnabled: true
      }
    ],
    defaultRetailer: 'df64coffee',
    affiliateEnabled: true
  },
  {
    id: '3',
    name: 'Stainless Steel Coffee Knock Box Drawer',
    description: 'Thickened residue powder holder for espresso pucks',
    category: 'Accessory',
    price: '$24.06',
    purchaseDate: '2023-02-05',
    purchaseLocation: 'eBay',
    link: 'https://www.ebay.com/itm/235892727385',
    image: getUnsplashImageUrl('Stainless Steel Coffee Knock Box Drawer'),
    createdAt: '2023-02-06T12:00:00Z',
    updatedAt: '2023-02-06T12:00:00Z',
    userId: '1',
    retailers: [],
    defaultRetailer: '',
    affiliateEnabled: false
  },
  {
    id: '4',
    name: 'IMS Precision Shower Screen 55mm',
    description: 'Replacement for Gaggia Classic machines',
    category: 'Accessory',
    price: '$12.99',
    purchaseDate: '2023-02-10',
    purchaseLocation: 'Amazon',
    link: 'https://www.amazon.com/dp/B0DCVFT79T',
    image: getUnsplashImageUrl('IMS Precision Shower Screen 55mm'),
    createdAt: '2023-02-11T12:00:00Z',
    updatedAt: '2023-02-11T12:00:00Z',
    userId: '1',
    retailers: [
      {
        retailerId: 'amazon',
        url: 'https://www.amazon.com/dp/B0DCVFT79T',
        price: 12.99,
        inStock: true,
        lastChecked: '2024-03-14T00:00:00Z',
        affiliateEnabled: true
      }
    ],
    defaultRetailer: 'amazon',
    affiliateEnabled: true
  },
  {
    id: '5',
    name: 'Espresso Filter Basket 18g 58mm',
    description: 'Compatible with La Marzocco/Futurmat/DEC',
    category: 'Accessory',
    price: '$9.99',
    purchaseDate: '2023-02-15',
    purchaseLocation: 'Amazon',
    link: 'https://www.amazon.com/dp/B0DFRB2QRG',
    image: getUnsplashImageUrl('Espresso Filter Basket 18g 58mm'),
    createdAt: '2023-02-16T12:00:00Z',
    updatedAt: '2023-02-16T12:00:00Z',
    userId: '1',
    retailers: [],
    defaultRetailer: '',
    affiliateEnabled: false
  },
  {
    id: '6',
    name: 'Aieve WDT Tool Espresso',
    description: 'Distribution tool with ease of use in 2 ways installation',
    category: 'Accessory',
    price: '$8.99',
    purchaseDate: '2023-02-20',
    purchaseLocation: 'Amazon',
    link: 'https://www.amazon.com/dp/B0BGKXQ2B4',
    image: getUnsplashImageUrl('Aieve WDT Tool Espresso'),
    createdAt: '2023-02-21T12:00:00Z',
    updatedAt: '2023-02-21T12:00:00Z',
    userId: '1',
    retailers: [],
    defaultRetailer: '',
    affiliateEnabled: false
  },
  {
    id: '7',
    name: '58.5mm Espresso Puck Screen (2 Pack)',
    description: 'Reusable 1.7mm thickness 150μm coffee filter mesh plate',
    category: 'Accessory',
    price: '$6.99',
    purchaseDate: '2023-02-25',
    purchaseLocation: 'Amazon',
    link: 'https://www.amazon.com/dp/B09XLL2PPB',
    image: getUnsplashImageUrl('58.5mm Espresso Puck Screen (2 Pack)'),
    createdAt: '2023-02-26T12:00:00Z',
    updatedAt: '2023-02-26T12:00:00Z',
    userId: '1',
    retailers: [],
    defaultRetailer: '',
    affiliateEnabled: false
  },
  {
    id: '8',
    name: 'BAGAIL BASICS Coffee Scale with Timer',
    description: '0.1g high precision kitchen scale with auto tare and touch sensor',
    category: 'Scale',
    price: '$19.99',
    purchaseDate: '2023-03-01',
    purchaseLocation: 'Amazon',
    link: 'https://www.amazon.com/dp/B0BNL5JCVR',
    image: getUnsplashImageUrl('BAGAIL BASICS Coffee Scale with Timer'),
    createdAt: '2023-03-02T12:00:00Z',
    updatedAt: '2023-03-02T12:00:00Z',
    userId: '1',
    retailers: [],
    defaultRetailer: '',
    affiliateEnabled: false
  },
  {
    id: '9',
    name: 'Libbey Duratuff Cortado Glasses (Set of 2)',
    description: 'Gibraltar rocks glass 4.5 oz with paper coasters included',
    category: 'Accessory',
    price: '$14.00',
    purchaseDate: '2023-03-05',
    purchaseLocation: 'Amazon',
    link: 'https://www.amazon.com/dp/B078JFYZSS',
    image: getUnsplashImageUrl('Libbey Duratuff Cortado Glasses (Set of 2)'),
    createdAt: '2023-03-06T12:00:00Z',
    updatedAt: '2023-03-06T12:00:00Z',
    userId: '1',
    retailers: [],
    defaultRetailer: '',
    affiliateEnabled: false
  },
  {
    id: '10',
    name: 'AMOAMI Coffee Mat',
    description: 'Rubber backed absorbent dish drying mat for kitchen counter',
    category: 'Accessory',
    price: '$7.40',
    purchaseDate: '2023-03-10',
    purchaseLocation: 'Amazon',
    link: 'https://www.amazon.com/dp/B09SYNZ1LY',
    image: getUnsplashImageUrl('AMOAMI Coffee Mat'),
    createdAt: '2023-03-11T12:00:00Z',
    updatedAt: '2023-03-11T12:00:00Z',
    userId: '1',
    retailers: [],
    defaultRetailer: '',
    affiliateEnabled: false
  },
  {
    id: '11',
    name: 'Coffee Machine Descaler',
    description: 'USA made cleaner for all coffee machines and espresso makers',
    category: 'Accessory',
    price: '$8.85',
    purchaseDate: '2023-03-15',
    purchaseLocation: 'Amazon',
    link: 'https://www.amazon.com/dp/B01CM0TR5Y',
    image: getUnsplashImageUrl('Coffee Machine Descaler'),
    createdAt: '2023-03-16T12:00:00Z',
    updatedAt: '2023-03-16T12:00:00Z',
    userId: '1',
    retailers: [],
    defaultRetailer: '',
    affiliateEnabled: false
  },
  {
    id: '12',
    name: 'Espresso Machine Cleaning Brush Kit',
    description: 'CAFEMASY 2 pieces coffee cleaning brush with spoon and detachable brush heads',
    category: 'Accessory',
    price: '$9.99',
    purchaseDate: '2023-03-20',
    purchaseLocation: 'Amazon',
    link: 'https://www.amazon.com/dp/B088R41MLH',
    image: getUnsplashImageUrl('Espresso Machine Cleaning Brush Kit'),
    createdAt: '2023-03-21T12:00:00Z',
    updatedAt: '2023-03-21T12:00:00Z',
    userId: '1',
    retailers: [],
    defaultRetailer: '',
    affiliateEnabled: false
  },
  {
    id: '13',
    name: 'Aluminum Espresso Dosing Funnel',
    description: 'Dosing ring suitable for 58mm portafilters in black color',
    category: 'Accessory',
    price: '$5.99',
    purchaseDate: '2023-03-25',
    purchaseLocation: 'Amazon',
    link: 'https://www.amazon.com/dp/B089R7NTXM',
    image: getUnsplashImageUrl('Aluminum Espresso Dosing Funnel'),
    createdAt: '2023-03-26T12:00:00Z',
    updatedAt: '2023-03-26T12:00:00Z',
    userId: '1',
    retailers: [],
    defaultRetailer: '',
    affiliateEnabled: false
  },
  {
    id: '14',
    name: 'Low Profile Drip Tray',
    description: 'Compatible with Gaggia Classic Pro, heat-resistant ABS plastic',
    category: 'Accessory',
    price: '$11.99',
    purchaseDate: '2023-04-01',
    purchaseLocation: 'Amazon',
    link: 'https://www.amazon.com/dp/B0CNVY4M8T',
    image: getUnsplashImageUrl('Low Profile Drip Tray'),
    createdAt: '2023-04-02T12:00:00Z',
    updatedAt: '2023-04-02T12:00:00Z',
    userId: '1',
    retailers: [],
    defaultRetailer: '',
    affiliateEnabled: false
  },
  {
    id: '15',
    name: 'Atomizer Spray Bottle',
    description: 'Lisapack 8ML perfume spray bottle for travel, matte black',
    category: 'Accessory',
    price: '$6.99',
    purchaseDate: '2023-04-05',
    purchaseLocation: 'Amazon',
    link: 'https://www.amazon.com/dp/B0799CCY2Y',
    image: getUnsplashImageUrl('Atomizer Spray Bottle'),
    createdAt: '2023-04-06T12:00:00Z',
    updatedAt: '2023-04-06T12:00:00Z',
    userId: '1',
    retailers: [],
    defaultRetailer: '',
    affiliateEnabled: false
  },
  {
    id: '16',
    name: '9 Bar OPV Spring Modification',
    description: 'Compatible with Gaggia Classic Pro or EVO traditional espresso coffee machine',
    category: 'Accessory',
    price: '$6.99',
    purchaseDate: '2023-04-10',
    purchaseLocation: 'Amazon',
    link: 'https://www.amazon.com/dp/B0D5BT4F77',
    image: getUnsplashImageUrl('9 Bar OPV Spring Modification'),
    createdAt: '2023-04-11T12:00:00Z',
    updatedAt: '2023-04-11T12:00:00Z',
    userId: '1',
    retailers: [],
    defaultRetailer: '',
    affiliateEnabled: false
  },
  {
    id: '17',
    name: 'Homaxy Cotton Waffle Weave Kitchen Dish Cloths',
    description: 'Ultra soft absorbent quick drying dish towels, 12 x 12 inches, 6-pack, dark grey',
    category: 'Accessory',
    price: '$9.98',
    purchaseDate: '2023-04-15',
    purchaseLocation: 'Amazon',
    link: 'https://www.amazon.com/dp/B07WMQP4SF',
    image: getUnsplashImageUrl('Homaxy Cotton Waffle Weave Kitchen Dish Cloths'),
    createdAt: '2023-04-16T12:00:00Z',
    updatedAt: '2023-04-16T12:00:00Z',
    userId: '1',
    retailers: [],
    defaultRetailer: '',
    affiliateEnabled: false
  },
  {
    id: '18',
    name: 'Apexstone 58mm Coffee Distributor',
    description: 'Coffee distribution tool and leveler for 58mm portafilters',
    category: 'Accessory',
    price: '$17.99',
    purchaseDate: '2023-04-20',
    purchaseLocation: 'Amazon',
    link: 'https://www.amazon.com/dp/B077BZ4CV6',
    image: getUnsplashImageUrl('Apexstone 58mm Coffee Distributor'),
    createdAt: '2023-04-21T12:00:00Z',
    updatedAt: '2023-04-21T12:00:00Z',
    userId: '1',
    retailers: [],
    defaultRetailer: '',
    affiliateEnabled: false
  },
  {
    id: '19',
    name: '58mm Espresso Tamper',
    description: 'Spring loaded tamper with depth-adjustable espresso hand tampers',
    category: 'Accessory',
    price: '$16.97',
    purchaseDate: '2023-04-25',
    purchaseLocation: 'Amazon',
    link: 'https://www.amazon.com/dp/B0CLV6MH29',
    image: getUnsplashImageUrl('58mm Espresso Tamper'),
    createdAt: '2023-04-26T12:00:00Z',
    updatedAt: '2023-04-26T12:00:00Z',
    userId: '1',
    retailers: [],
    defaultRetailer: '',
    affiliateEnabled: false
  },
  {
    id: '20',
    name: 'OEM Gaggia Bottomless Portafilter 58mm',
    description: 'Authentic Italian portafilter with 3 cup filter basket for Gaggia Classic Pro',
    category: 'Accessory',
    price: '$39.22',
    purchaseDate: '2023-05-01',
    purchaseLocation: 'Amazon',
    link: 'https://www.amazon.com/dp/B09G56HMTG',
    image: getUnsplashImageUrl('OEM Gaggia Bottomless Portafilter 58mm'),
    createdAt: '2023-05-02T12:00:00Z',
    updatedAt: '2023-05-02T12:00:00Z',
    userId: '1',
    retailers: [],
    defaultRetailer: '',
    affiliateEnabled: false
  },
  {
    id: '21',
    name: 'Coffee Dosing Cup 58mm',
    description: 'Stainless steel espresso dosing cup compatible with all 58mm portafilters',
    category: 'Accessory',
    price: '$8.99',
    purchaseDate: '2023-05-05',
    purchaseLocation: 'Amazon',
    link: 'https://www.amazon.com/dp/B0DKFXWKR8',
    image: getUnsplashImageUrl('Coffee Dosing Cup 58mm'),
    createdAt: '2023-05-06T12:00:00Z',
    updatedAt: '2023-05-06T12:00:00Z',
    userId: '1',
    retailers: [],
    defaultRetailer: '',
    affiliateEnabled: false
  }
];

// Sample equipment data for user 1's "Travel Kit"
export const travelKitEquipment: Equipment[] = [
  {
    id: '22',
    name: 'AeroPress Coffee and Espresso Maker',
    description: 'Portable coffee maker that brews American style coffee or espresso style coffee',
    category: 'Brewing Device',
    price: '$29.95',
    purchaseDate: '2023-05-10',
    purchaseLocation: 'Amazon',
    link: 'https://www.amazon.com/AeroPress-Coffee-Espresso-Maker-Bitterness/dp/B0047BIWSK',
    image: getUnsplashImageUrl('AeroPress Coffee and Espresso Maker'),
    createdAt: '2023-05-11T12:00:00Z',
    updatedAt: '2023-05-11T12:00:00Z',
    userId: '1',
    retailers: [],
    defaultRetailer: '',
    affiliateEnabled: false
  },
  {
    id: '23',
    name: 'Porlex Mini Stainless Steel Coffee Grinder',
    description: 'Portable hand grinder with ceramic conical burrs',
    category: 'Grinder',
    price: '$69.95',
    purchaseDate: '2023-05-15',
    purchaseLocation: 'Amazon',
    link: 'https://www.amazon.com/Porlex-Mini-Stainless-Coffee-Grinder/dp/B0044ZA066',
    image: getUnsplashImageUrl('Porlex Mini Stainless Steel Coffee Grinder'),
    createdAt: '2023-05-16T12:00:00Z',
    updatedAt: '2023-05-16T12:00:00Z',
    userId: '1',
    retailers: [],
    defaultRetailer: '',
    affiliateEnabled: false
  }
];

// Create user equipment setups
export const userEquipmentSetups = [
  {
    id: 'default',
    name: 'Main Setup',
    description: 'My primary coffee equipment',
    equipment: espressoEquipment,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-05-06T00:00:00Z',
  },
  {
    id: 'travel',
    name: 'Travel Kit',
    description: 'Portable coffee setup for travel',
    equipment: travelKitEquipment,
    createdAt: '2023-05-01T00:00:00Z',
    updatedAt: '2023-05-16T00:00:00Z',
  },
];

// Calculate total value of equipment
export const calculateTotalValue = (equipment: Equipment[]): string => {
  return equipment
    .reduce((sum, item) => {
      const price = parseFloat(item.price.replace('$', '').replace(',', ''));
      return sum + price;
    }, 0)
    .toFixed(2);
}; 