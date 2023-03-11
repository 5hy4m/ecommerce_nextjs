import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export const Header = () => {
  return (
    <Container className="header_container">
      <Navbar>
        <Navbar.Brand href="/">Uniq Goods</Navbar.Brand>
      </Navbar>
    </Container>
  );
};
