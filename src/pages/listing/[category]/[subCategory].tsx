import {
    getAllCategories,
    getProductsBySubCategory,
    ProductType,
} from '@/services/notion';
import React from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Categories, Filters } from '../..';
import { ProductListing } from '@/components/ProductListing';

type SubCategoryProps = {
    subCategory: string;
    products: ProductType[];
    categories: Categories;
    filters: Filters;
};

export default function SubCategory({
    subCategory,
    products,
    categories,
    filters,
}: SubCategoryProps) {
    return (
        <main>
            <Header categories={categories} filters={filters} />

            <ProductListing products={products} />

            <Footer />
        </main>
    );
}

export async function getStaticProps(props: { params: SubCategoryProps }) {
    const {
        params: { subCategory },
    } = props;

    console.time('[SubCategory] getAllCategories');
    const { categories, filters } = await getAllCategories();
    console.timeEnd('[SubCategory] getAllCategories');

    console.time('getProductsBySubCategory');
    const products = await getProductsBySubCategory(subCategory);
    console.timeEnd('getProductsBySubCategory');

    return {
        props: { subCategory, products, categories, filters },
    };
}

export async function getStaticPaths() {
    const paths: any = [];

    console.time('[SubCategory] getAllCategories');
    const { categories, filters } = await getAllCategories();
    console.timeEnd('[SubCategory] getAllCategories');

    Object.entries(categories).map((category: any) => {
        const [categoryName, subCategories] = category;
        return subCategories.map((name: string) => {
            paths.push({
                params: {
                    category: categoryName,
                    subCategory: name,
                },
            });
        });
    });

    return {
        paths: paths,
        fallback: false,
    };
}
