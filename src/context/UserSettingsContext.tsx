import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserSettings {
  showCsvExport: boolean;
  showTotalPrice: boolean;
  showProductImages: boolean;
}

interface UserSettingsContextType {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
}

const defaultSettings: UserSettings = {
  showCsvExport: true,
  showTotalPrice: true,
  showProductImages: true,
};

const UserSettingsContext = createContext<UserSettingsContextType | undefined>(undefined);

export const UserSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize settings from localStorage or use defaults
  const [settings, setSettings] = useState<UserSettings>(() => {
    const savedSettings = localStorage.getItem('userSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  // Update settings and save to localStorage
  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prevSettings => {
      const updatedSettings = { ...prevSettings, ...newSettings };
      localStorage.setItem('userSettings', JSON.stringify(updatedSettings));
      return updatedSettings;
    });
  };

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
  }, [settings]);

  return (
    <UserSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </UserSettingsContext.Provider>
  );
};

export const useUserSettings = (): UserSettingsContextType => {
  const context = useContext(UserSettingsContext);
  if (context === undefined) {
    throw new Error('useUserSettings must be used within a UserSettingsProvider');
  }
  return context;
};

export default UserSettingsContext; 