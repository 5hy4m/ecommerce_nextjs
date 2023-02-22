import { Header } from "@/components/Header";
import { getCategories, getProductsByCategory } from "@/services/notion";
import { Product } from "@/services/notion/parser";
import Link from "next/link";
import React from "react";
import Container from "react-bootstrap/Container";
import styles from "./Category.module.css";
import Card from "react-bootstrap/Card";
import Image from "next/image";
import Button from "react-bootstrap/Button";

type CategoryProps = {
  category: string;
  products: Product[];
};

export default function Category({ category, products }: CategoryProps) {
  return (
    <Container>
      <Header />
      <div className={styles.category_container}>
        <h1>{category}</h1>
        <div>
          {products.map((product: any, i) => (
            <Card className={styles.card} key={`Products_${i}`}>
              {/* <Link href={`/product/${product.Rupees}`} key={`Products_${i}`}> */}
              <div className={styles.img_container}>
                <Image
                  className="card-img"
                  src={product.imageUrls[0]}
                  alt={product.name}
                  fill
                />
              </div>
              <Card.Body className={styles.card_body}>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <div>₹{product.rupees}</div>
                <Button
                  className={styles.details_button}
                  variant="outline-primary"
                >
                  Details
                </Button>
              </Card.Body>
              {/* </Link> */}
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}

export async function getStaticProps(props: { params: CategoryProps }) {
  const {
    params: { category },
  } = props;

  console.time("getProductsByCategory");
  const products = await getProductsByCategory(category);
  console.timeEnd("getProductsByCategory");

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
