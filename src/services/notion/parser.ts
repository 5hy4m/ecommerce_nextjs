export type Product = {
  [key in string]: string | URL[] | number;
};

type PropertyMapper = {
  [key in string]: string;
};

const propertyMapper: PropertyMapper = {
  Stock: "stock",
  Category: "category",
  Rupees: "rupees",
  Name: "name",
  Description: "description",
  "Image Urls": "imageUrls",
};

export const parseProduct = ({ properties }: any): any => {
  const propNames = Object.keys(properties);

  let parsedProduct = {} as any;

  propNames.forEach((name: string) => {
    const prop = properties[name];
    const content = prop[prop.type];
    const propName = propertyMapper[name];

    if (name === "Category") {
      return (parsedProduct[propName] = content.name);
    }

    // handles Stock, Rupees fields
    if (!Array.isArray(content)) {
      return (parsedProduct[propName] = content);
    }

    if (name.toLowerCase() === "image urls") {
      return (parsedProduct[propName] = content.map((item) => item.name));
    }

    // handles Name and Description fields
    return (parsedProduct[propName] = content
      .map((item) => item[item.type].content)
      .join(""));
  });

  return parsedProduct;
};
