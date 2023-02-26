import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export const Header = () => {
  return (
    <>
      <Navbar>
        <Container className="nav_container">
          <Navbar.Brand>Uniq Goods</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <hr />
      </Container>
    </>
  );
};
