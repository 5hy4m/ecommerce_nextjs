import Container from "react-bootstrap/Container";
import styles from "./Product.module.css";
import Image from "next/image";
import {
  getCategories,
  getProductsByCategory,
  getProduct,
} from "../../services/notion";

type ProductProps = {
  product: any;
  url: string;
};

export default function Product({ product }: ProductProps) {
  return (
    <Container className={styles.container}>
      <section className={styles.images_section}>
        <div className={styles.primary_image_container}>
          {/* <Image src={product.imageUrls[0]} alt={product.name} fill></Image> */}
        </div>
      </section>
      <section className={styles.details_section}></section>
    </Container>
  );
}

export async function getStaticProps(props: any) {
  const {
    params: { product },
  } = props;

  console.time("getProduct");
  const productObject = await getProduct(product);
  console.timeEnd("getProduct");

  return {
    props: { product: productObject },
  };
}

export async function getStaticPaths() {
  console.time("getCategoriesPaths");
  const categories: string[] = await getCategories();
  console.timeEnd("getCategoriesPaths");

  const productPromises = categories.map((category) =>
    getProductsByCategory(category)
  );

  console.time("getAllProducts");
  const settledPromises: any = await Promise.allSettled(productPromises);
  console.timeEnd("getAllProducts");

  let products = [] as any;
  settledPromises.forEach((promise: any) => {
    promise.value.forEach((product: any) => {
      products = [...products, { params: { product: product.url } }];
    });
  });

  return {
    paths: products,
    fallback: false,
  };
}
