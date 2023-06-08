import { getAllCategories, getProductsByCategory } from '@/services/notion';
import { ProductType } from '@/services/notion';
import React from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Categories, Filters } from '..';
import { ProductListing } from '@/components/ProductListing';

type CategoryProps = {
    category: string;
    products: ProductType[];
    categories: Categories;
    filters: Filters;
};

export default function Category({
    category,
    products,
    categories,
    filters,
}: CategoryProps) {
    return (
        <main>
            <Header categories={categories} filters={filters} />

            <ProductListing products={products} />

            <Footer />
        </main>
    );
}

export async function getStaticProps(props: { params: CategoryProps }) {
    const {
        params: { category },
    } = props;

    console.time('[Category] getCategories');
    const { categories, filters } = await getAllCategories();
    console.timeEnd('[Category] getCategories');

    console.time('getProductsByCategory');
    const products = await getProductsByCategory(category);
    console.timeEnd('getProductsByCategory');

    return {
        props: { category, products, categories, filters },
    };
}

export async function getStaticPaths() {
    console.time('[Category] getCategories');
    const { categories, filters } = await getAllCategories();
    console.timeEnd('[Category] getCategories');

    const paths = Object.keys(categories).map((name: string) => ({
        params: {
            category: name,
        },
    }));

    return {
        paths,
        fallback: false,
    };
}
