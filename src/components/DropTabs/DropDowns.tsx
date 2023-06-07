import { useGlobalContext } from '@/hooks/useGlobalContext';
import React, { useEffect, useRef, useState } from 'react';
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
            children: { category, subCategories },
            style,
            className,
            'aria-labelledby': labeledBy,
        }: any,
        ref: any,
    ) => {
        const { filters } = useGlobalContext();
        const [menuWidth, setMenuWidth] = useState(9999999);
        style = {
            ...style,
            left: `calc(50% - ${menuWidth}px/2`,
            top: '25px',
        };
        const menuRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const width = menuRef.current?.getBoundingClientRect().width;
            width && setMenuWidth(width);
        }, []);

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                <div ref={menuRef} className={` ${styles.desktop_menu} `}>
                    {subCategories.map((subCategory: string, i: number) => {
                        const hasFilters = filters[subCategory].length > 0;
                        return (
                            <div key={subCategory + i}>
                                <Dropdown.Item className={styles.columnHeader}>
                                    <Link
                                        href={`/listing/${category}/${subCategory}`}
                                    >
                                        {subCategory}
                                    </Link>
                                </Dropdown.Item>

                                {hasFilters ? (
                                    <>
                                        <Dropdown.Divider />
                                        {filters[subCategory].map(
                                            (filter: string, i) => {
                                                return (
                                                    <Dropdown.Item
                                                        key={filter + i}
                                                        href={`/listing/${category}/${subCategory}/${filter}`}
                                                    >
                                                        {filter}
                                                    </Dropdown.Item>
                                                );
                                            },
                                        )}
                                    </>
                                ) : null}
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
            show={show}
        >
            <Dropdown.Toggle
                id='dropdown-autoclose-outside'
                as={CustomToggle}
                variant='dark'
            >
                {category}
            </Dropdown.Toggle>

            <Dropdown.Menu show={show} as={CustomMenu} align={'end'}>
                {{ category, subCategories } as any}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default DropDowns;
