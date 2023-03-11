import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import Nav from "react-bootstrap/Nav";
import Offcanvas from "react-bootstrap/Offcanvas";

type HeaderProps = { categories: string[] };

export const Header = ({ categories }: HeaderProps) => {
  return (
    <>
      <Navbar bg="light" expand={"md"} className="mb-3">
        <Container className={styles.container} fluid>
          <Navbar.Brand href="#">Uniq Goods</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-'md'-${"md"}`}>
            <Image alt="categories" fill src="/category.png" />
          </Navbar.Toggle>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-'md'-${"md"}`}
            aria-labelledby={`offcanvasNavbarLabel-'md'-${"md"}`}
            placement="end"
          >
            <Offcanvas.Header className={styles.offcanvas_header} closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-'md'-${"md"}`}>
                Categories
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="me-auto">
                <Row className={styles.categoryContainer}>
                  {categories.map((name: string, i) => (
                    <Link href={`/category/${name}`} key={`Categories_${i}`}>
                      {name}
                    </Link>
                  ))}
                </Row>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};
