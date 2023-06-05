import { Categories, Filters } from '@/pages';
import { createContext } from 'react';

export const defaultValue = {
    showHeader: false,
    categories: {} as Categories,
    filters: {} as Filters,
    setShowHeader: (show: boolean) => {},
    setCategories: (categories: Categories) => {},
    setFilters: (filters: Filters) => {},
};

export const GlobalContext = createContext(defaultValue);
