import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_SECRET });

type SELECT_TYPE = {
  type: "select";
  select: {
    options: any;
  };
  id: string;
  name: string;
};

export const getCategories = async (): Promise<string[]> => {
  if (!process.env.NOTION_DATABASE_ID || !process.env.NOTION_SECRET) {
    console.error("Can't find notion env variable");
    return [];
  }

  try {
    const response: any = await notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    return response.properties.Class.select.options.map(
      (option: Partial<{ name: string }>) => option.name
    );
  } catch (err) {
    console.error("Fetch categories from notion failed: ", err);
    throw err;
  }
};

export const getProducts = async (): Promise<string[]> => {
  if (!process.env.NOTION_DATABASE_ID || !process.env.NOTION_SECRET) {
    console.error("Can't find notion env variable");
    return [];
  }

  try {
    const response: any = await notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    return response.properties.Class.select.options.map(
      (option: Partial<{ name: string }>) => option.name
    );
  } catch (err) {
    console.error("Fetch categories from notion failed: ", err);
    throw err;
  }
};
