import { Header } from "@/components/Header";
import { getCategories } from "@/services/notion";
import React from "react";

type CategoryProps = {
  category: string;
};

export default function FirstCategory({ category }: CategoryProps) {
  return (
    <>
      <Header />
      <div>
        <h1>{category}</h1>
      </div>
    </>
  );
}

export async function getStaticProps(props: { params: CategoryProps }) {
  const {
    params: { category },
  } = props;

  return {
    props: { category },
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
