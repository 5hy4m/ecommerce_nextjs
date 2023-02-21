import { Header } from "@/components/Header";
import { getCategories, getProductsByCategory } from "@/services/notion";
import Link from "next/link";
import React from "react";
import styles from "./Category.module.css";

type CategoryProps = {
  category: string;
  products: Array<any>;
};

export default function FirstCategory({ category, products }: CategoryProps) {
  console.log(products);

  return (
    <>
      <Header />
      <div className={styles.category_container}>
        <h1>{category}</h1>
        {products.map((product: any, i) => (
          <Link
            href={`/product/${product.Name.title[0].plain_text}`}
            key={`Products_${i}`}
          >
            {product.Name.title[0].plain_text}
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

  const products = await getProductsByCategory(category);

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
