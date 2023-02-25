import { Header } from "@/components/Header";
import { getCategories, getProductsByCategory } from "@/services/notion";
import { Product } from "@/services/notion/parser";
import Link from "next/link";
import React from "react";
import Container from "react-bootstrap/Container";
import styles from "./Category.module.css";
import Card from "react-bootstrap/Card";
import Image from "next/image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

type CategoryProps = {
  category: string;
  products: Product[];
};

export default function Category({ category, products }: CategoryProps) {
  const maxTitleCharPerRow = 45;
  const maxDescCharPerRow = 18;
  return (
    <Container>
      <Header />
      <Row>
        <Col>
          <h1 className={styles.h1}>{category}</h1>
          <div className={styles.cards_layout}>
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
                  <h2>₹{product.rupees}</h2>
                  <span>
                    {product.name.slice(0, maxTitleCharPerRow)}
                    {product.name.length > maxTitleCharPerRow && "..."}
                  </span>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
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
