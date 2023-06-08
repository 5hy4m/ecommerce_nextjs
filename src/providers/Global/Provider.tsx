import { useState } from 'react';
import { GlobalContext, defaultValue } from './Context';

type GlobalProviderProps = { children: React.ReactNode };

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const [showHeader, setShowHeader] = useState(false);
    const [categories, setCategories] = useState({});
    const [filters, setFilters] = useState({});

    return (
        <GlobalContext.Provider
            value={{
                showHeader,
                categories,
                filters,
                setShowHeader,
                setCategories,
                setFilters,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
