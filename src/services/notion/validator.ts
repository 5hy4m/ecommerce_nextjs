export const commonProductFilters = {
    and: [
        {
            property: 'isActive',
            checkbox: {
                equals: true,
            },
        },
        {
            property: 'Image Urls',
            files: {
                is_not_empty: true,
            },
        },
        {
            property: 'Name',
            title: {
                is_not_empty: true,
            },
        },
        {
            property: 'Rupees',
            number: {
                is_not_empty: true,
            },
        },
    ],
};
