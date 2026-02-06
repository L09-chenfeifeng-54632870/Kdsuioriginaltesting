import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for our settings
export type Language = 'en' | 'zh' | 'bi';

export interface LayoutSettings {
  orderViewMin: number;
  orderViewMax: number;
  itemViewMin: number;
  itemViewMax: number;
  summaryViewMin: number;
  summaryViewMax: number;
}

export interface AlertSetting {
  minutes: number;
  color: string;
  label: string;
}

export interface SettingsState {
  deviceUuid: string;
  kdsId: string;
  stationId: string;
  ipAddress: string;
  language: Language;
  layoutSettings: LayoutSettings;
  alertSettings: AlertSetting[];
}

interface SettingsContextType extends SettingsState {
  updateSettings: (newSettings: Partial<SettingsState>) => void;
  resetSettings: () => void;
}

const defaultLayoutSettings: LayoutSettings = {
  orderViewMin: 4,
  orderViewMax: 8,
  itemViewMin: 6,
  itemViewMax: 12,
  summaryViewMin: 10,
  summaryViewMax: 20
};

const defaultAlertSettings: AlertSetting[] = [
  { minutes: 10, color: '#f59e0b', label: 'warning' }, // Amber
  { minutes: 20, color: '#ef4444', label: 'critical' } // Red
];

const defaultSettings: SettingsState = {
  deviceUuid: '', // Will be generated on mount if empty
  kdsId: 'KDS1',
  stationId: '09',
  ipAddress: 'localhost',
  language: 'en',
  layoutSettings: defaultLayoutSettings,
  alertSettings: defaultAlertSettings
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  // Initialize state from localStorage or defaults
  const [settings, setSettings] = useState<SettingsState>(() => {
    if (typeof window === 'undefined') return defaultSettings;
    
    const saved = localStorage.getItem('kds_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge with defaults to ensure all fields exist (in case of schema updates)
        return { 
            ...defaultSettings, 
            ...parsed,
            layoutSettings: { ...defaultLayoutSettings, ...(parsed.layoutSettings || {}) },
            alertSettings: parsed.alertSettings || defaultAlertSettings
        };
      } catch (e) {
        console.error('Failed to parse settings from localStorage', e);
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  // Ensure UUID exists
  useEffect(() => {
    if (!settings.deviceUuid) {
      const storedUuid = localStorage.getItem('deviceUuid');
      const newUuid = storedUuid || 'KDS-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      
      if (!storedUuid) {
        localStorage.setItem('deviceUuid', newUuid);
      }
      
      updateSettings({ deviceUuid: newUuid });
    }
  }, []);

  const updateSettings = (newSettings: Partial<SettingsState>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('kds_settings', JSON.stringify(updated));
      return updated;
    });
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('kds_settings');
  };

  return (
    <SettingsContext.Provider value={{ ...settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
