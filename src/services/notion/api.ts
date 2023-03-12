import { Client } from '@notionhq/client';
import { parseProduct } from './parser';

const notion = new Client({ auth: process.env.NOTION_SECRET });
const databaseId = process.env.NOTION_DATABASE_ID;
const secret = process.env.NOTION_SECRET;

export const getCategories = async (): Promise<string[]> => {
    if (!databaseId || !secret) {
        console.error("Can't find notion env variable");
        return [];
    }

    try {
        const response: any = await notion.databases.retrieve({
            database_id: databaseId,
        });

        return response.properties.Category.select.options.map(
            (option: Partial<{ name: string }>) => option.name,
        );
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

        return response.results.map((product) => parseProduct(product));
    } catch (err) {
        console.error('Fetch categories from notion failed: ', err);
        throw err;
    }
};

export const getProduct = async (productUrl: string): Promise<any[]> => {
    if (!databaseId || !secret) {
        console.error("Can't find notion env variable");
        return [];
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

        return parseProduct(response.results[0]);
    } catch (err) {
        console.error('Fetch categories from notion failed: ', err);
        throw err;
    }
};
