import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Link from "next/link";
import styles from "./Header.module.css";

type HeaderProps = { categories: string[] };

export const Header = ({ categories }: HeaderProps) => {
  console.log(categories);

  return (
    <Container className={styles.header_container}>
      <Navbar>
        <Navbar.Brand href="/">Uniq Goods</Navbar.Brand>
        {/* <Row className="categoryContainer">
          {categories.map((name: string, i) => (
            <Link href={`/category/${name}`} key={`Categories_${i}`}>
              {name}
            </Link>
          ))}
        </Row> */}
      </Navbar>
    </Container>
  );
};
