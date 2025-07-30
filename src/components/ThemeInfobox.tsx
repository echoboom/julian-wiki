'use client';

import React, { ReactNode } from 'react';

interface ThemeInfoboxProps {
  children: ReactNode;
  className?: string;
}

const ThemeInfobox: React.FC<ThemeInfoboxProps> = ({ children, className = '' }) => {
  // Get theme from localStorage or default to dark
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'auto'>('dark');
  
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('wiki-theme') as 'light' | 'dark' | 'auto';
    if (savedTheme) {
      setTheme(savedTheme);
    }
    
    // Listen for theme changes
    const handleStorageChange = () => {
      const currentTheme = localStorage.getItem('wiki-theme') as 'light' | 'dark' | 'auto';
      if (currentTheme) {
        setTheme(currentTheme);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for direct theme changes on the same tab
    const interval = setInterval(() => {
      const currentTheme = localStorage.getItem('wiki-theme') as 'light' | 'dark' | 'auto';
      if (currentTheme && currentTheme !== theme) {
        setTheme(currentTheme);
      }
    }, 100);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [theme]);
  
  const backgroundClass = theme === 'dark' ? 'bg-gray-800' : theme === 'light' ? 'bg-gray-50' : 'bg-gray-50 dark:bg-gray-800';
  const borderClass = theme === 'dark' ? 'border-gray-700' : theme === 'light' ? 'border-gray-200' : 'border-gray-200 dark:border-gray-700';
  
  return (
    <div className={`${backgroundClass} border ${borderClass} rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );
};

export default ThemeInfobox;