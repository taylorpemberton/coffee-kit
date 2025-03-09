/**
 * Blacklist of usernames that are not allowed.
 * This includes:
 * - Reserved system names
 * - Offensive terms
 * - Brand names and trademarks
 * - Common admin/system usernames
 * - Reserved for platform use
 */
export const USERNAME_BLACKLIST = [
  // Reserved system names
  'admin', 'administrator', 'system', 'root', 'superuser', 'moderator', 'mod',
  'support', 'help', 'info', 'contact', 'staff', 'team', 'official',
  
  // Reserved for platform use
  'home', 'dashboard', 'profile', 'settings', 'account', 'login', 'logout',
  'signin', 'signout', 'register', 'signup', 'user', 'users', 'member', 'members',
  'coffee', 'coffeekit', 'coffee-kit', 'espresso', 'barista',
  
  // Common admin/system usernames
  'webmaster', 'postmaster', 'hostmaster', 'abuse', 'security', 'noreply', 'no-reply',
  'mail', 'email', 'administrator', 'admin1', 'admin2', 'test', 'tester', 'testing',
  
  // Brand names and trademarks
  'facebook', 'instagram', 'twitter', 'tiktok', 'snapchat', 'pinterest', 'linkedin',
  'google', 'youtube', 'microsoft', 'apple', 'amazon', 'netflix', 'spotify',
  'paypal', 'stripe', 'visa', 'mastercard', 'amex',
  
  // Coffee brands
  'starbucks', 'peets', 'bluebottle', 'philz', 'dunkin', 'lavazza', 'illy',
  'nespresso', 'keurig', 'gaggia', 'breville', 'delonghi',
  
  // Offensive terms (minimal list - would be more comprehensive in production)
  'anonymous', 'undefined', 'null', 'none', 'deleted', 'banned',
  
  // Reserved for future use
  'premium', 'pro', 'plus', 'business', 'enterprise', 'verified',
  
  // Special characters and patterns
  'username', 'user_name', 'user-name', 'display_name', 'display-name',
  'firstname', 'lastname', 'first_name', 'last_name', 'first-name', 'last-name'
];

/**
 * Validates a username against the blacklist and other rules
 * @param username The username to validate
 * @returns An object with isValid and message properties
 */
export const validateUsername = (username: string): { isValid: boolean; message: string } => {
  // Check if username is too short
  if (username.length < 3) {
    return { isValid: false, message: 'Username must be at least 3 characters long' };
  }
  
  // Check if username is too long
  if (username.length > 20) {
    return { isValid: false, message: 'Username must be at most 20 characters long' };
  }
  
  // Check if username contains only allowed characters
  const validUsernameRegex = /^[a-zA-Z0-9_.-]+$/;
  if (!validUsernameRegex.test(username)) {
    return { isValid: false, message: 'Username can only contain letters, numbers, underscores, dots, and hyphens' };
  }
  
  // Check if username is in the blacklist (case insensitive)
  if (USERNAME_BLACKLIST.some(item => item.toLowerCase() === username.toLowerCase())) {
    return { isValid: false, message: 'This username is not available' };
  }
  
  // Check if username starts with a special character
  if (/^[_.-]/.test(username)) {
    return { isValid: false, message: 'Username cannot start with a special character' };
  }
  
  // Check if username ends with a special character
  if (/[_.-]$/.test(username)) {
    return { isValid: false, message: 'Username cannot end with a special character' };
  }
  
  // Check if username has consecutive special characters
  if (/[_.-]{2,}/.test(username)) {
    return { isValid: false, message: 'Username cannot contain consecutive special characters' };
  }
  
  return { isValid: true, message: 'Username is valid' };
}; 