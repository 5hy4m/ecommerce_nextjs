import { useGlobalContext } from '@/hooks/useGlobalContext';
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import styles from './CategoriesAccordian.module.css';

export function CategoriesAccordian() {
    const { categories, filters } = useGlobalContext();

    return (
        <Accordion className={styles.accordion}>
            {Object.entries(categories).map(([category, subCategories], i) => (
                <Accordion.Item key={category + i} eventKey={`category-${i}`}>
                    <Accordion.Header>{category}</Accordion.Header>

                    <Accordion.Body className={styles.accordionBody}>
                        <Accordion
                            className={`${styles.accordion} ${styles.subAccordion}`}
                        >
                            {subCategories.map((subCategory, i) => {
                                const hasFilters =
                                    filters[subCategory].length > 0;

                                return (
                                    <Accordion.Item
                                        key={subCategory + i}
                                        eventKey={`subCategories-${i}`}
                                    >
                                        {hasFilters ? (
                                            <Accordion.Header>
                                                {subCategory}
                                            </Accordion.Header>
                                        ) : (
                                            <Accordion.Item
                                                className={styles.noFilters}
                                                eventKey={`subCategory-${i}`}
                                            >
                                                {subCategory}
                                            </Accordion.Item>
                                        )}

                                        {filters[subCategory].map(
                                            (filter, i) => (
                                                <Accordion.Body
                                                    key={`${filter}-i`}
                                                >
                                                    {filter}
                                                </Accordion.Body>
                                            ),
                                        )}
                                    </Accordion.Item>
                                );
                            })}
                        </Accordion>
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    );
}
