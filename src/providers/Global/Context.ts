import { createContext } from 'react';

export const defaultValue = {
    showHeader: false,
    setShowHeader: (show: boolean) => {},
};

export const GlobalContext = createContext(defaultValue);
