import fs from 'fs';
var path = require('path');

export const cache = {
    get: (fileName: string): unknown => {
        try {
            const data = fs.readFileSync(
                path.join(process.cwd(), `.next/cache/${fileName}.db`),
            );
            const categories: unknown = JSON.parse(data as unknown as string);
            return categories;
        } catch {}
    },
    set: (fileName: string, data: unknown) => {
        return fs.writeFileSync(
            path.join(process.cwd(), `.next/cache/${fileName}.db`),
            JSON.stringify(data),
        );
    },
};
