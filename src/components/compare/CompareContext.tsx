'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductProps } from '../products/ProductCard';

interface CompareContextType {
  compareList: ProductProps[];
  addToCompare: (product: ProductProps) => boolean;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareList, setCompareList] = useState<ProductProps[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bti_compare_list');
      if (saved) {
        setCompareList(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('bti_compare_list', JSON.stringify(compareList));
    } catch (e) {}
  }, [compareList]);

  const addToCompare = (product: ProductProps): boolean => {
    if (compareList.some((p) => p.id === product.id)) {
      removeFromCompare(product.id);
      return false;
    }
    if (compareList.length >= 4) {
      alert('You can compare up to 4 products at a time.');
      return false;
    }
    setCompareList((prev) => [...prev, product]);
    return true;
  };

  const removeFromCompare = (id: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCompare = () => {
    setCompareList([]);
    setIsDrawerOpen(false);
  };

  const isInCompare = (id: string) => {
    return compareList.some((p) => p.id === id);
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
