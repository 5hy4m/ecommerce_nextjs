import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { categoryListCache } from '../cache';
import { parseProduct, Product } from './parser';

const notion = new Client({ auth: process.env.NOTION_SECRET });
const databaseId = process.env.NOTION_DATABASE_ID;
const secret = process.env.NOTION_SECRET;

export const getCategories = async (): Promise<string[]> => {
    if (!databaseId || !secret) {
        console.error("Can't find notion env variable");
        return [];
    }

    let categories = categoryListCache.get();

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

        categoryListCache.set(categories!);

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

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: 'Category',
                select: {
                    equals: category,
                },
            },
        });
        const products = response.results.map((product) =>
            parseProduct(product as PageObjectResponse),
        );
        return products.filter((product) => product.isActive);
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

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: 'URL',
                rich_text: {
                    equals: productUrl,
                },
            },
        });

        // If response.results has more than one element then There is a duplication in Notion Table
        if (response.results.length > 1)
            console.warn('Duplicates found in Notion Table');

        const product = parseProduct(response.results[0] as PageObjectResponse);

        return product.isActive ? product : ({} as Product);
    } catch (err) {
        console.error('Fetch categories from notion failed: ', err);
        throw err;
    }
};
