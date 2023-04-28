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
        }

        if (name === 'Category') {
            parsedProduct[propName] = content.name;
            continue;
        }

        // handles Stock, Rupees fields
        if (!Array.isArray(content)) {
            parsedProduct[propName] = content;
            continue;
        }

        if (name.toLowerCase() === 'image urls') {
            parsedProduct[propName] = content.map((item) => item.name);
            continue;
        }

        // handles Name and Description fields
        parsedProduct[propName] = content
            .map((item) => item[item.type].content)
            .join('');
    }

    return parsedProduct;
};
