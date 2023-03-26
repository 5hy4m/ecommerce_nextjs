import { GlobalContext } from '@/providers/Global/Context';
import { useContext } from 'react';

export const useGlobalContext = () => {
    try {
        return useContext(GlobalContext);
    } catch (err) {
        throw new Error('Please use this hook wrapped under GlobalProvider');
    }
};
