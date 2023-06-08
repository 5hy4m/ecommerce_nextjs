import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

type PropertyMapper = {
    [key in string]: string;
};

export type Product = {
    url: string;
    description: string;
    undefined: boolean;
    imageUrls: string[];
    stock: number;
    rupees: number;
    name: string;
    isActive: boolean;
};

const propertyMapper: PropertyMapper = {
    Stock: 'stock',
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

export function categoryParser(categoryResponse: any, filters: any) {
    let categories = {} as any;
    let allCategories = {} as any;

    categoryResponse.results?.forEach((result: any) => {
        const key = result.properties.Name.title[0]?.plain_text;
        if (!key) return;

        categories[key] = [];
        allCategories[key] = [];

        result.properties.Rollup.rollup.array.map((prop: any) => {
            const value = prop.title[0].plain_text;
            categories[key].push(value);
            allCategories[key].push({ [value]: filters[value] });
        });
    });
    return { categories, allCategories };
}

export function subCategoryParser(subCategoryResponse: any) {
    let filters = {} as any;

    subCategoryResponse.results?.forEach((result: any) => {
        const key = result.properties.Name.title[0]?.plain_text;
        if (!key) return;

        filters[key] = [];

        result.properties.Rollup.rollup.array.map((prop: any) => {
            const value = prop.title[0].plain_text;
            filters[key].push(value);
        });
    });
    return filters;
}
