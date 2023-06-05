import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import styles from './DropTabs.module.css';
import { useGlobalContext } from '@/hooks/useGlobalContext';
import { Col, Row } from 'react-bootstrap';

interface Props {}

export function DropTabs({}: Props) {
    const { categories, filters } = useGlobalContext();

    return (
        <Tabs
            defaultActiveKey='profile'
            id='uncontrolled-tab-example'
            className='mb-3'
        >
            {Object.entries(categories).map(([category, subCategories], i) => {
                return (
                    <Tab
                        key={category + i}
                        className={styles.tab}
                        eventKey={category}
                        title={category}
                    >
                        {subCategories.map((subCategory: string) => (
                            <Col key={subCategory + i}>
                                <span className={styles.subCategory_text}>
                                    {subCategory + ' | '}
                                </span>
                                {filters[subCategory].map(
                                    (filter: string, i) => {
                                        return (
                                            <span key={filter + i}>
                                                {filter}
                                            </span>
                                        );
                                    },
                                )}
                            </Col>
                        ))}
                    </Tab>
                );
            })}
        </Tabs>
    );
}
