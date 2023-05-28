export type ProductType = {
    stock: string;
    category: string;
    rupees: number;
    name: string;
    description: string;
    imageUrls: string[];
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

export type PropertyMapper = {
    [key in string]: string;
};

export enum Database {
    Product = 'Product',
    Category = 'Category',
    SubCategory = 'SubCategory',
}

export type DatabaseIds = {
    [key in Database]: string;
};
