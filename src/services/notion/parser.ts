export type Product = {
  [key in string]: string | URL[] | number;
};

export const parseProduct = ({ properties }: any): any => {
  console.log("PRODUCT: ", properties);
  const propNames = Object.keys(properties);
  console.log("PROPS: ", propNames);

  let parsedProduct = {} as any;

  propNames.forEach((name: string) => {
    const prop = properties[name];
    const content = prop[prop.type];

    if (name === "Category") {
      return (parsedProduct[name] = content.name);
    }

    if (!Array.isArray(content)) {
      return (parsedProduct[name] = content);
    }

    if (name.toLowerCase() === "image urls") {
      return (parsedProduct[name.toLowerCase().trim()] = content.map(
        (item) => item
      ));
    }

    console.log("content: ", content);
    console.log("NAME: ", name);

    return (parsedProduct[name] = content
      .map((item) => item[item.type].content)
      .join(""));
  });

  return parsedProduct;
};
