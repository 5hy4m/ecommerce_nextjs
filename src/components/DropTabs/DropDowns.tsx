import { useGlobalContext } from '@/hooks/useGlobalContext';
import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import styles from './DropTabs.module.css';
import Link from 'next/link';

interface Props {
    category: string;
    subCategories: string[];
    idx: number;
}

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
// eslint-disable-next-line react/display-name
export const CustomToggle = React.forwardRef(
    (
        { children: category, onClick }: { children: any; onClick: any },
        ref: any,
    ) => {
        return (
            <a
                href=''
                ref={ref}
                onClick={(e) => {
                    e.preventDefault();
                    onClick(e);
                }}
            >
                {category}
            </a>
        );
    },
);

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
// eslint-disable-next-line react/display-name
export const CustomMenu = React.forwardRef(
    (
        {
            children: subCategories,
            style,
            className,
            'aria-labelledby': labeledBy,
        }: any,
        ref: any,
    ) => {
        const { filters } = useGlobalContext();
        style = {
            ...style,
            left: `calc(50% - var(--header-menu-width)/2`,
            top: '25px',
        };

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                <div className={` ${styles.desktop_menu} `}>
                    {subCategories.map((subCategory: string, i: number) => {
                        return (
                            <div key={subCategory + i}>
                                <Dropdown.Item className={styles.columnHeader}>
                                    <Link href={`/subcategory/${subCategory}`}>
                                        {subCategory}
                                    </Link>
                                </Dropdown.Item>

                                <Dropdown.Divider />

                                {filters[subCategory].map(
                                    (filter: string, i) => {
                                        return (
                                            <Dropdown.Item
                                                key={filter + i}
                                                href='#/action-2'
                                            >
                                                {filter}
                                            </Dropdown.Item>
                                        );
                                    },
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    },
);

function DropDowns({ category, subCategories, idx }: Props) {
    const [show, setShow] = useState(false);

    return (
        <Dropdown
            key={category + idx}
            as={ButtonGroup}
            onMouseLeave={() => setShow(false)}
            onMouseOver={() => setShow(true)}
        >
            <Dropdown.Toggle
                id='dropdown-autoclose-false'
                as={CustomToggle}
                variant='dark'
            >
                {category}
            </Dropdown.Toggle>

            <Dropdown.Menu show={show} as={CustomMenu} align={'end'}>
                {subCategories}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default DropDowns;
