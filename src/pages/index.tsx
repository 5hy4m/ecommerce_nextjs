import Head from "next/head";
import { Header } from "./components/Header/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import styles from "./Home.module.css";
import { getCategories } from "./services/notion/";

type HomeProps = {
  categories: string[];
};

export default function Home({ categories }: HomeProps) {
  return (
    <>
      <Head>
        <title>UniqGoods</title>
        <meta name="description" content="Vintage and Retro games" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Container>
          <hr />
          <Row className={styles.categoryContainer}>
            {categories.map((category: string, i) => (
              <div key={`Categories_${i}`}>{category}</div>
            ))}
          </Row>
        </Container>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const categories = await getCategories();

  return {
    props: { categories },
  };
}
