import fs from 'fs';
var path = require('path');

const PRODUCT_CACHE_PATH = process.env.PRODUCT_CACHE_PATH;
const PRODUCTS_CACHE_PATH = process.env.PRODUCTS_CACHE_PATH;

export const productCache = {
    get: (): string[] | null | undefined => {
        const data = fs.readFileSync(
            path.join(process.cwd(), `${PRODUCT_CACHE_PATH}.db`),
        );
        const products: string[] = JSON.parse(data as unknown as string);

        return products;
    },
    set: (categories: string[]) => {
        return fs.writeFileSync(
            path.join(process.cwd(), `${PRODUCT_CACHE_PATH}.db`),
            JSON.stringify(categories),
        );
    },
};
