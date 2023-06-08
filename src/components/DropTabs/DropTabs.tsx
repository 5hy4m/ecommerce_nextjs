import React from 'react';
import styles from './DropTabs.module.css';
import DropDowns from './DropDowns';
import { useGlobalContext } from '@/hooks/useGlobalContext';

export function DropTabs() {
    const { categories } = useGlobalContext();

    return (
        <div className={styles.tabsContainer}>
            {Object.entries(categories).map(([category, subCategories], i) => {
                return (
                    <DropDowns
                        key={category + i}
                        category={category}
                        subCategories={subCategories}
                        idx={i}
                    />
                );
            })}
        </div>
    );
}
