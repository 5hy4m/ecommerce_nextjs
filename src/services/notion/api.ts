import { Client } from "@notionhq/client";
import { Product, parseProduct } from "./parser";

const notion = new Client({ auth: process.env.NOTION_SECRET });
const databaseId = process.env.NOTION_DATABASE_ID;
const secret = process.env.NOTION_SECRET;

export const getCategories = async (): Promise<string[]> => {
  if (!databaseId || !secret) {
    console.error("Can't find notion env variable");
    return [];
  }

  try {
    const response: any = await notion.databases.retrieve({
      database_id: databaseId,
    });

    return response.properties.Category.select.options.map(
      (option: Partial<{ name: string }>) => option.name
    );
  } catch (err) {
    console.error("Fetch categories from notion failed: ", err);
    throw err;
  }
};

export const getProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  if (!databaseId || !secret) {
    console.error("Can't find notion env variable");
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Category",
        select: {
          equals: category,
        },
      },
    });

    return response.results.map((product) => parseProduct(product));
  } catch (err) {
    console.error("Fetch categories from notion failed: ", err);
    throw err;
  }
};