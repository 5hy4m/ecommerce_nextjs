import { Client } from '@notionhq/client';
import {
    GetDatabaseResponse,
    PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { cache } from '../cache';
import { parseProduct, Product } from './parser';
import { validateProduct } from './validator';
import { Database, DatabaseIds } from './types';

const PRODUCT_CACHE_PATH = process.env.PRODUCT_CACHE_PATH;
const PRODUCTS_CACHE_PATH = process.env.PRODUCTS_CACHE_PATH;
const DATABASE_DETAILS_CACHE_PATH = process.env.DATABASE_DETAILS_CACHE_PATH;

const secret = process.env.NOTION_SECRET;
const productDatabaseId = process.env.PRODUCT_DATABASE_ID;
const categoryDatabaseId = process.env.CATEGORY_DATABASE_ID;
const subCategoryDatabaseId = process.env.SUBCATEGORY_DATABASE_ID;

const notion = new Client({ auth: secret });

const databaseIds: DatabaseIds = {
    [Database.Product]: productDatabaseId!,
    [Database.Category]: categoryDatabaseId!,
    [Database.SubCategory]: subCategoryDatabaseId!,
};

export const getProductsByCategory = async (
    category: string,
): Promise<Product[]> => {
    if (!productDatabaseId || !secret) {
        console.error("Can't find notion env variable");
        return [];
    }
    const cachePath = `${PRODUCTS_CACHE_PATH}_${category}`;

    let products = cache.get(cachePath) as Product[];

    if (products) {
        console.log('using cache to get products list');
        return products;
    }
    console.log("Can't find a cache for getProductsByCategory API: ", category);

    try {
        const response = await notion.databases.query({
            database_id: productDatabaseId,
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

        const products: Product[] = response.results
            .map((product) => parseProduct(product as PageObjectResponse))
            .filter((product) => validateProduct(product));

        cache.set(cachePath, products!);

        return products;
    } catch (err) {
        console.error('Fetch productsByCategory from notion failed: ', err);
        throw err;
    }
};

export const getProduct = async (productUrl: string): Promise<Product> => {
    if (!productDatabaseId || !secret) {
        console.error("Can't find notion env variable");
        return {} as Product;
    }
    const cachePath = `${PRODUCT_CACHE_PATH}_${productUrl}`;
    let product = cache.get(cachePath) as Product;

    if (product) {
        console.log('using cache to get product');
        return product;
    }
    console.log("Can't find a cache for getProduct API");

    try {
        const response = await notion.databases.query({
            database_id: productDatabaseId,
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
        console.error('Fetch product from notion failed: ', err);
        throw err;
    }
};

export const getDatabaseDetails = async (database: Database) => {
    const databaseId = databaseIds[database];
    if (!databaseId || !secret || !DATABASE_DETAILS_CACHE_PATH) {
        console.error("Can't find notion env variable");
        throw new Error('Notion credentials missing');
    }
    const cachePath = `${DATABASE_DETAILS_CACHE_PATH}-${databaseId}`;

    let details = cache.get(cachePath);

    if (details) {
        console.log(`using cache to get ${database} database details `);
        return details;
    }

    console.log(`Can't find a cache for ${database} DatabaseDetails API`);

    try {
        const response = await notion.databases.retrieve({
            database_id: databaseId,
        });

        cache.set(cachePath, response!);

        return response!;
    } catch (err) {
        console.error(`Fetch ${database} details from notion failed: `, err);
        throw err;
    }
};
