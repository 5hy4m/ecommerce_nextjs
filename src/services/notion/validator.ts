import { Product } from './types';

export const validateProduct = (product: Product): boolean => {
    return (
        product.name != '' &&
        product.rupees != null &&
        product.imageUrls.length != 0
    );
};
