import {
    GetDatabaseResponse,
    PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { getDatabaseDetails } from './api';
import { Database } from './types';

type PropertyMapper = {
    [key in string]: string;
};

export type Product = {
    url: string;
    description: string;
    undefined: boolean;
    imageUrls: string[];
    stock: number;
    category: string;
    rupees: number;
    name: string;
    isActive: boolean;
};

const propertyMapper: PropertyMapper = {
    Stock: 'stock',
    Category: 'category',
    Rupees: 'rupees',
    Name: 'name',
    Description: 'description',
    'Image Urls': 'imageUrls',
    URL: 'url',
    isActive: 'isActive',
};

export const parseProduct = ({ properties }: PageObjectResponse): Product => {
    let parsedProduct = {} as any;

    for (const [name, prop] of Object.entries(properties)) {
        const [a, b, content] = Object.values(prop);
        const propName = propertyMapper[name];

        if (name === 'URL') {
            parsedProduct[propName] = `${content.string}`.toLowerCase();
            continue;
        }

        if (name === 'isActive') {
            parsedProduct[propName] = content;
            continue;
        }

        if (name === 'Category') {
            parsedProduct[propName] = content.name;
            continue;
        }

        // handles Stock, Rupees fields
        if (name === 'Stock' || name === 'Rupees') {
            parsedProduct[propName] = content;
            continue;
        }

        if (name.toLowerCase() === 'image urls') {
            parsedProduct[propName] = content.map((item: any) => item.name);
            continue;
        }

        // handles Name and Description fields
        if (name === 'Name' || name === 'Description') {
            parsedProduct[propName] = content
                .map((item: any) => item[item.type].content)
                .join('');
        }
    }

    return parsedProduct;
};

export const getAllCategories = async (): Promise<GetDatabaseResponse> => {
    let categories = {} as any;
    let subcategories = {} as any;

    const categoryResponse: any = await getDatabaseDetails(Database.Category);

    const subCategoryResponse: any = await getDatabaseDetails(
        Database.SubCategory,
    );

    subCategoryResponse.results?.forEach((result: any) => {
        const key = result.properties.Name.title[0]?.plain_text;
        if (!key) return;

        subcategories[key] = [];

        result.properties.Rollup.rollup.array.map((prop: any) => {
            const value = prop.title[0].plain_text;
            subcategories[key].push(value);
        });
    });

    categoryResponse.results?.forEach((result: any) => {
        const key = result.properties.Name.title[0]?.plain_text;
        if (!key) return;

        categories[key] = [];

        result.properties.Rollup.rollup.array.map((prop: any) => {
            const value = prop.title[0].plain_text;
            categories[key].push({ [value]: subcategories[value] });
        });
    });

    return categories!;
};
