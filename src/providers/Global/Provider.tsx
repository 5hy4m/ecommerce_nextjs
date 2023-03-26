import { useState } from 'react';
import { GlobalContext, defaultValue } from './Context';

type GlobalProviderProps = { children: React.ReactNode };

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const [showHeader, setShowHeader] = useState(false);

    return (
        <GlobalContext.Provider value={{ showHeader, setShowHeader }}>
            {children}
        </GlobalContext.Provider>
    );
};
