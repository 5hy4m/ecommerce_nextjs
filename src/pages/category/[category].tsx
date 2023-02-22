import { Header } from "@/components/Header";
import { getCategories, getProductsByCategory } from "@/services/notion";
import { Product } from "@/services/notion/parser";
import Link from "next/link";
import React from "react";
import styles from "./Category.module.css";

type CategoryProps = {
  category: string;
  products: Product[];
};

export default function Category({ category, products }: CategoryProps) {
  return (
    <>
      <Header />
      <div className={styles.category_container}>
        <h1>{category}</h1>
        {products.map((product: any, i) => (
          <Link href={`/product/${product.Rupees}`} key={`Products_${i}`}>
            {product.Rupees}
          </Link>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps(props: { params: CategoryProps }) {
  const {
    params: { category },
  } = props;

  console.time("getProductsByCategory");
  const products = await getProductsByCategory(category);
  console.timeEnd("getProductsByCategory");
  console.log("PRODUCTS: ", products);
  console.log("PRODUCTS: ", products["Image Urls"]);

  return {
    props: { category, products },
  };
}

export async function getStaticPaths() {
  console.time("getCategoriesPaths");
  const categories: string[] = await getCategories();
  console.timeEnd("getCategoriesPaths");

  const paths = categories.map((name) => ({
    params: {
      category: name,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
