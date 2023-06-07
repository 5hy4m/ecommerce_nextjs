import {
    getAllCategories,
    getProductsByFilter,
    ProductType,
} from '@/services/notion';
import React from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Categories, Filters } from '../../..';
import { ProductListing } from '@/components/ProductListing';

type FilterProps = {
    filter: string;
    products: ProductType[];
    categories: Categories;
    filters: Filters;
};

export default function Filter({
    filter,
    products,
    categories,
    filters,
}: FilterProps) {
    return (
        <main>
            <Header categories={categories} filters={filters} />

            <ProductListing products={products} />

            <Footer />
        </main>
    );
}

export async function getStaticProps(props: { params: FilterProps }) {
    const {
        params: { filter },
    } = props;

    console.time('[Filter] getAllCategories');
    const { categories, filters } = await getAllCategories();
    console.timeEnd('[Filter] getAllCategories');

    console.time('getProductsByFilter');
    const products = await getProductsByFilter(filter);
    console.timeEnd('getProductsByFilter');

    return {
        props: { filter, products, categories, filters },
    };
}

export async function getStaticPaths() {
    const paths: any = [];

    console.time('[Filter] getAllCategories');
    const { categories, filters } = await getAllCategories();
    console.timeEnd('[Filter] getAllCategories');

    Object.entries(categories).map((category: any) => {
        const [categoryName, subCategories] = category;

        subCategories.map((subCategory: string) => {
            filters[subCategory].map((name: string) =>
                paths.push({
                    params: {
                        category: categoryName,
                        subCategory,
                        filter: name,
                    },
                }),
            );
        });
    });

    return {
        paths: paths,
        fallback: false,
    };
}
