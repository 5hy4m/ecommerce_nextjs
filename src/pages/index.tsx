import Head from "next/head";
import { Header } from "./components/Header/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Home.module.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export default function Home() {
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
            <div>Video Games</div>
            <div>Video Games</div>
            <div>Video Games</div>
            <div>Video Games</div>
            <div>Video Games</div>
            <div>Video Games</div>
            <div>Video Games</div>
            <div>Video Games</div>
            <div>Video Games</div>
            <div>Video Games</div>
            <div>Video Games</div>
            <div>Video Games</div>
            <div>Video Games</div>
          </Row>
        </Container>
      </main>
    </>
  );
}
