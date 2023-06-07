import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import styles from './BreadCrumbs.module.css';
import { useRouter } from 'next/router';

function BreadCrumbs() {
    const router = useRouter();
    const breadCrumbs = Object.values(router.query);

    const { category, subCategory }: any = breadCrumbs;

    const breadCrumbItemProps: any[] = [];

    if (breadCrumbs.length === 1) {
        breadCrumbItemProps.push({ active: true });
    }
    if (breadCrumbs.length === 2) {
        breadCrumbItemProps.push({ href: `/${category}` });
        breadCrumbItemProps.push({ active: true });
    }
    if (breadCrumbs.length === 3) {
        breadCrumbItemProps.push({ href: `/${category}` });
        breadCrumbItemProps.push({ href: `/${category}/${subCategory}` });
        breadCrumbItemProps.push({ active: true });
    }

    return (
        <Breadcrumb className={styles.breadCrumb}>
            {breadCrumbs.map((breadCrumb, i) => (
                <Breadcrumb.Item
                    key={`${breadCrumb}-${i}`}
                    {...breadCrumbItemProps[i]}
                >
                    {breadCrumb}
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
}

export default BreadCrumbs;
