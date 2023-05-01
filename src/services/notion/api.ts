import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { cache } from '../cache';
import { parseProduct, Product } from './parser';

const CATEGORY_CACHE_PATH = process.env.CATEGORY_LIST_CACHE_PATH;
const PRODUCT_CACHE_PATH = process.env.PRODUCT_CACHE_PATH;
const PRODUCTS_CACHE_PATH = process.env.PRODUCTS_CACHE_PATH;

const notion = new Client({ auth: process.env.NOTION_SECRET });
const databaseId = process.env.NOTION_DATABASE_ID;
const secret = process.env.NOTION_SECRET;

export const getCategories = async (): Promise<string[]> => {
    if (!databaseId || !secret) {
        console.error("Can't find notion env variable");
        return [];
    }
    const cachePath = `${CATEGORY_CACHE_PATH}`;

    let categories = cache.get(cachePath) as string[];

    if (categories) {
        console.log('using cache to get categories');
        return categories;
    }

    try {
        const response: any = await notion.databases.retrieve({
            database_id: databaseId,
        });
        categories = response.properties.Category.select.options.map(
            (option: Partial<{ name: string }>) => option.name,
        );

        cache.set(cachePath, categories!);

        return categories!;
    } catch (err) {
        console.error('Fetch categories from notion failed: ', err);
        throw err;
    }
};

export const getProductsByCategory = async (
    category: string,
): Promise<any[]> => {
    if (!databaseId || !secret) {
        console.error("Can't find notion env variable");
        return [];
    }
    const cachePath = `${PRODUCTS_CACHE_PATH}_${category}`;

    let products = cache.get(cachePath) as Product[];

    if (products) {
        console.log('using cache to get products list');
        return products;
    }

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                and: [
                    {
                        property: 'Category',
                        select: {
                            equals: category,
                        },
                    },
                    {
                        property: 'isActive',
                        checkbox: {
                            equals: true,
                        },
                    },
                ],
            },
        });

        const products = response.results.map((product) =>
            parseProduct(product as PageObjectResponse),
        );

        cache.set(cachePath, products!);

        return products;
    } catch (err) {
        console.error('Fetch categories from notion failed: ', err);
        throw err;
    }
};

export const getProduct = async (productUrl: string): Promise<Product> => {
    if (!databaseId || !secret) {
        console.error("Can't find notion env variable");
        return {} as Product;
    }
    const cachePath = `${PRODUCT_CACHE_PATH}_${productUrl}`;
    let product = cache.get(cachePath) as Product;

    if (product) {
        console.log('using cache to get product');
        return product;
    }

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                and: [
                    {
                        property: 'URL',
                        rich_text: {
                            equals: productUrl,
                        },
                    },
                    {
                        property: 'isActive',
                        checkbox: {
                            equals: true,
                        },
                    },
                ],
            },
        });

        // If response.results has more than one element then There is a duplication in Notion Table
        if (response.results.length > 1)
            console.warn('Duplicates found in Notion Table');

        const product = parseProduct(response.results[0] as PageObjectResponse);

        cache.set(cachePath, product!);

        return product;
    } catch (err) {
        console.error('Fetch categories from notion failed: ', err);
        throw err;
    }
};
