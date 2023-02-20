import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <>
      <Navbar className={styles.navbar}>
        <Container className={styles.container}>
          <Navbar.Brand>Uniq Goods</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className={styles.container}>
        <hr />
      </Container>
    </>
  );
};
