import fs from 'fs';
var path = require('path');

const CATEGORY_LIST_CACHE_PATH = process.env.CATEGORY_LIST_CACHE_PATH;

export const categoryListCache = {
    get: (): string[] | null | undefined => {
        const data = fs.readFileSync(
            path.join(process.cwd(), `${CATEGORY_LIST_CACHE_PATH}.db`),
        );
        const categories: string[] = JSON.parse(data as unknown as string);

        return categories;
    },
    set: (categories: string[]) => {
        return fs.writeFileSync(
            path.join(process.cwd(), `${CATEGORY_LIST_CACHE_PATH}.db`),
            JSON.stringify(categories),
        );
    },
};
